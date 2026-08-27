import fs from "fs"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.services.js"

export const analyzeResume = async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({ message: "Resume Required" })
        }
        const filePath = req.file.path

        const fileBuffer = await fs.promises.readFile(filePath)
        const uint8Array = new Uint8Array(fileBuffer)

        const pdf = await pdfjsLib.getDocument({data: uint8Array}).promise

        let resumeText = ""
        for(let pageNum = 1; pageNum <= pdf.numPages; pageNum++){
            const page = await pdf.getPage(pageNum)
            const content = await page.getTextContent()

            const pageText = content.items.map(item => item.str).join(" ")
            resumeText += pageText+"\n"
        }
        resumeText = resumeText.replace(/\s+/g, " ").trim()

        const messages = [
            {
                role: "system",
                content: `Extract structured data from resume.
                Return strictly JSON:
                {
                    "role": "string",
                    "experience": "string",
                    "projects": ["project1", "project2"],
                    "skills": ["skills1", "skills2"],
                }`
            },
            {
                role: "user",
                content: resumeText
            }
        ]


        const aiResponse = await askAi(messages)
        const parsed = JSON.parse(aiResponse)

        fs.unlinkSync(filePath)


        res.json({
            role: parsed.role,
            experience: parsed.experience,
            projects: parsed.projects,
            skills: parsed.skills,
            resumeText
        })

    } catch (err) {
        console.error(err)

        if(req.file && fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path)
        }
        return res.status(500).json({ message: err.message })
    }
}
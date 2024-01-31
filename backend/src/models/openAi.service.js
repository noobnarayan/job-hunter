import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateJobDescription(jobDetails) {
  const prompt = `Generate a detailed job description for the following role using the provided data. The response should be in HTML format (Do not use any other tag except h2, p, ul, li, underline strong, bold and italic. No need to generate doctype or title tag or body tag).

Job Details:
${JSON.stringify(jobDetails, null, 2)}

---

**Job Title:** [Enter a specific and engaging job title within 50-60 characters]

**Company Overview:**
[Provide a comprehensive introduction to your company's culture, values, and mission. Highlight key achievements and goals.]

**Job Summary:**
[Clearly articulate the role's purpose and its significance within the organization. Outline key responsibilities and how they contribute to company success.]

**Responsibilities and Duties:**
- [List main tasks and responsibilities using bullet points. Provide detailed explanations for each.]

**Qualifications and Skills:**
[Specify the required skills, experience, and educational background in detail. Highlight any certifications or specific competencies.]

**Compensation and Benefits:**
[Mention the salary range, bonus structures, and any additional benefits such as health insurance, retirement plans, etc. Provide a comprehensive overview.]

---

*Additional Information:*

**Company Culture Description:**
[Delve into the unique aspects of your company culture. Discuss values, work environment, team collaboration, and any employee engagement initiatives.]

**Growth and Development Opportunities:**
[Detail professional development paths within the role. Mention training programs, mentorship opportunities, and career advancement possibilities.]

---

*Important Notes:(Its is instruction for you, don't provide this in the  response)*

- Focus on clarity and conciseness; use simple language and avoid jargon.
- Incorporate relevant keywords for search engines and applicant tracking systems.
- Ensure scannability by using bullet points, headings, and white space.
- Be inclusive; use gender-neutral language and avoid discriminatory terms.
- Proofread carefully to eliminate typos or grammatical errors.

`;

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 1,
      max_tokens: 700,
    });

    return gptResponse.choices[0].message.content;
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
  }
}

export { generateJobDescription };

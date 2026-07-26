# Pre-Assessment

A 20-question pre-course survey/quiz for students, covering:

- Background self-rating (Python, REST APIs, prior LLM/agent experience) — ungraded
- 12 graded multiple-choice concept questions across agents, RAG, embeddings,
  semantic search, context/state, and LangGraph
- 2 open-ended questions (what they hope to get out of the course, and how
  they'd explain "AI agent" in their own words)

## Setting it up (one-time, ~2 minutes)

1. Go to <https://script.google.com> and start a **New project**.
2. Delete the placeholder code, paste in the full contents of
   [`create_pre_assessment_form.gs`](./create_pre_assessment_form.gs).
3. Click **Run** on `createPreAssessmentForm`.
4. First run only: it'll ask you to authorize the script against your own
   Google account (Review permissions → your account → Advanced → Go to
   project (unsafe) → Allow). This is expected for a script you just
   pasted in yourself — it only touches Forms/Sheets in your own Drive.
5. Open **Executions** (clock icon, left sidebar) and expand the run to see
   three logged links:
   - **Student link** — share this with students (README/site/LMS/email)
   - **Editor link** — for you only, opens the form in edit mode
   - **Results spreadsheet** — live-updating Sheet of every submission

## Getting results

- **Google Forms itself**: open the editor link → **Responses** tab shows a
  summary view (answer distribution per question, average score) and an
  individual view per student with their score, since the 12 concept
  questions are auto-graded.
- **The linked Spreadsheet**: one row per submission, updated in real time,
  useful if you want to pull the data into your own analysis (pivot by
  self-rated experience vs. quiz score, etc.).

## Putting the link on the course site

Once you have the student link from step 5, send it to me (or add it
yourself) in [`../index.qmd`](../index.qmd) — there's a
"Pre-Course Assessment" section with a placeholder for it.

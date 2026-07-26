/**
 * "Building Agentic AI Systems — Post-Assessment" for the 2026-07-19 cohort
 * (course runs 19-23 July).
 *
 * Mirrors create_pre_assessment_form_2026-07-19.gs exactly — same 12 graded
 * concept questions, same choices, same points, same trimmed format (name +
 * email + graded questions only, no self-rating/open-ended items). Only the
 * title, description, function name, and destination sheet name are changed
 * to reflect that this is given at the end of the course.
 *
 * Scoring: 12 questions x 1 point = 12 total, which lines up with the master
 * sheet's out-of-12 pre/post columns, so no rescaling is needed.
 *
 * HOW TO RUN:
 *   1. Go to https://script.google.com -> New project.
 *   2. Delete the placeholder code and paste this whole file in.
 *   3. Click "Run" (▶) on createPostAssessmentForm.
 *   4. First run asks you to authorize the script against your own Google
 *      account -- "Review permissions" -> your account -> "Advanced" ->
 *      "Go to (project) (unsafe)" -> Allow. Normal for a script you wrote
 *      yourself; it only touches Forms/Sheets in YOUR Drive.
 *   5. Open View > Logs (or the Executions clock icon) for two URLs:
 *        - Student link  -> share this with the cohort
 *        - Editor link   -> responses/grades, keep private
 *
 * Google auto-grades it (setIsQuiz), and responses land live in a new sheet
 * named "Building Agentic AI Systems — Post-Assessment 2026-07-19 (Responses)".
 */
function createPostAssessmentForm() {
  const form = FormApp.create('Building Agentic AI Systems — Post-Assessment');
  form.setIsQuiz(true);
  form.setDescription(
    'A short check now that we have finished the course, covering the same ' +
    'ground as the pre-assessment so we can see how much moved. It is ' +
    'graded automatically, but it does not affect your grade in the course ' +
    '-- your capstone project does that. Answer what you can.'
  );
  form.setCollectEmail(true);
  form.setShuffleQuestions(false);

  form.addTextItem()
    .setTitle('Full name')
    .setRequired(true);

  // ---- Graded concept questions (12 x 1 point) -- identical to the pre-assessment ----
  addMC(form,
    'What best describes an "AI agent" built on an LLM?',
    [
      ['A chatbot that only answers FAQ questions', false],
      ['A system where an LLM decides which actions/tools to invoke to accomplish a task', true],
      ['A fixed rule-based decision tree', false],
      ['A search engine index', false],
    ]);

  addMC(form,
    'What does RAG stand for?',
    [
      ['Random Access Generation', false],
      ['Retrieval-Augmented Generation', true],
      ['Reinforced Agent Growth', false],
      ['Recursive Answer Generation', false],
    ]);

  addMC(form,
    'Why is RAG used with LLMs?',
    [
      ['To make responses shorter', false],
      ['To give the model access to external or up-to-date knowledge beyond its training data', true],
      ['To reduce the number of parameters in the model', false],
      ['To translate text between languages', false],
    ]);

  addMC(form,
    'What is an "embedding" in the context of LLMs?',
    [
      ['A hyperlink inside a document', false],
      ['A numerical vector representation of text that captures its meaning', true],
      ['A type of prompt template', false],
      ['A database index file', false],
    ]);

  addMC(form,
    'In semantic search, how are relevant documents found?',
    [
      ['By exact keyword matching only', false],
      ["By comparing the query's embedding to document embeddings for similarity", true],
      ['By random sampling', false],
      ['By document length', false],
    ]);

  addMC(form,
    'What is "tool calling" (a.k.a. function calling) in an LLM agent?',
    [
      ['The LLM directly executing code on its own hardware', false],
      ['The LLM producing a structured request to invoke a predefined function, which the application then runs', true],
      ['A way to fine-tune the model', false],
      ['A method for compressing prompts', false],
    ]);

  addMC(form,
    'True or False: a single LLM call can remember a previous, separate conversation with no extra system built around it.',
    [
      ['True', false],
      ['False', true],
    ]);

  addMC(form,
    'What is the purpose of a "system prompt"?',
    [
      ['To permanently store the conversation', false],
      ['To give the model instructions/context that shape its behavior throughout the interaction', true],
      ['To encrypt user data', false],
      ['To choose which programming language is used', false],
    ]);

  addMC(form,
    'Why split documents into "chunks" in a retrieval pipeline?',
    [
      ['It makes web pages load faster', false],
      ["It keeps text within the model's context window and improves retrieval relevance", true],
      ['It compresses the file size on disk', false],
      ['It removes duplicate content automatically', false],
    ]);

  addMC(form,
    'What is LangGraph primarily used for?',
    [
      ['Visualizing databases', false],
      ['Building and running stateful, graph-based agent workflows (branching, persistence, control flow)', true],
      ['Hosting websites', false],
      ['Training new LLMs from scratch', false],
    ]);

  addMC(form,
    'What does "human-in-the-loop" mean in an agent workflow?',
    [
      ["A human writes all of the agent's code manually", false],
      ['The workflow pauses so a human can review, approve, or edit before continuing', true],
      ['A human replaces the LLM entirely', false],
      ['It only applies to customer support chat', false],
    ]);

  addMC(form,
    'Why might an agent need both short-term and long-term memory?',
    [
      ['Short-term for the current conversation/session, long-term for information that should persist across sessions', true],
      ['They are two names for the same thing', false],
      ['Short-term memory is for images, long-term for text', false],
      ['Only long-term memory is ever needed', false],
    ]);

  // Link responses to a dedicated Sheet for this cohort.
  const ss = SpreadsheetApp.create('Building Agentic AI Systems — Post-Assessment 2026-07-19 (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Student link (share this): ' + form.getPublishedUrl());
  Logger.log('Editor link (view responses/grades, keep private): ' + form.getEditUrl());
  Logger.log('Results spreadsheet: ' + ss.getUrl());
}

/** Helper: adds a graded multiple-choice item. choices = [[text, isCorrect], ...] */
function addMC(form, title, choices) {
  const item = form.addMultipleChoiceItem().setTitle(title).setRequired(true).setPoints(1);
  item.setChoices(choices.map(([text, correct]) => item.createChoice(text, correct)));
}

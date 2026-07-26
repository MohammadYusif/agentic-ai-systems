/**
 * Creates the "Building Agentic AI Systems — Pre-Assessment" as a graded
 * Google Form, and links it to a new Google Sheet for results.
 *
 * HOW TO RUN:
 *   1. Go to https://script.google.com -> New project.
 *   2. Delete the placeholder code and paste this whole file in.
 *   3. Click "Run" (the ▶ button) on the createPreAssessmentForm function.
 *   4. The first run will ask you to authorize the script against your own
 *      Google account — click "Review permissions" -> pick your account ->
 *      "Advanced" -> "Go to (project) (unsafe)" -> Allow. This is normal for
 *      a script you just wrote yourself; it only touches Forms/Sheets in
 *      YOUR Drive.
 *   5. Open "Executions" (left sidebar, clock icon) or View > Logs to see
 *      two URLs printed:
 *        - Student link (fill out the form)  -> put this on the course site
 *        - Editor link (view responses/grades) -> for you only
 *
 * Results land automatically in a new spreadsheet named
 * "Building Agentic AI Systems — Pre-Assessment (Responses)" in your
 * Drive, updated live as students submit. Google Forms also shows a
 * per-question summary (charts, average score) under the form's own
 * "Responses" tab.
 */
function createPreAssessmentForm() {
  const form = FormApp.create('Building Agentic AI Systems — Pre-Assessment');
  form.setIsQuiz(true);
  form.setDescription(
    'Before we start: this short survey helps me understand where everyone ' +
    'is starting from, so I can pitch the course at the right level. ' +
    'There are no wrong answers in the "About You" section — answer ' +
    'honestly. The concept questions are graded, but this is a pre-check, ' +
    'not an exam; it will not affect your grade in the course.'
  );
  form.setCollectEmail(true);
  form.setShuffleQuestions(false);

  // ---- Section 1: About You (ungraded) ----
  form.addSectionHeaderItem()
    .setTitle('About You')
    .setHelpText('No wrong answers here — just context for me.');

  form.addTextItem()
    .setTitle('Full name')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Python programming experience')
    .setBounds(1, 5)
    .setLabels('Never written Python', 'Expert / professional')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Experience working with REST APIs')
    .setBounds(1, 5)
    .setLabels('Not familiar', 'Very comfortable')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('How often have you used an LLM tool (ChatGPT, Claude, etc.)?')
    .setChoiceValues(['Never', 'A few times', 'Regularly'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Have you built anything with an agent framework before (LangChain, AutoGen, CrewAI, etc.)?')
    .setChoiceValues(['Yes', 'No', 'Not sure what that is'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What are you hoping this course helps you do?')
    .setRequired(false);

  // ---- Section 2: Concepts (graded) ----
  form.addSectionHeaderItem()
    .setTitle('Concepts')
    .setHelpText('Graded, multiple choice. Pick the best answer.');

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
      ["To give the model instructions/context that shape its behavior throughout the interaction", true],
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

  // ---- Section 3: Open-ended (ungraded) ----
  form.addSectionHeaderItem()
    .setTitle('One more thing');

  form.addParagraphTextItem()
    .setTitle('In your own words, what do you think an "AI agent" is?')
    .setRequired(false);

  // Link responses to a dedicated Sheet.
  const ss = SpreadsheetApp.create('Building Agentic AI Systems — Pre-Assessment (Responses)');
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

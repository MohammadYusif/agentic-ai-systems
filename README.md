# Building Agentic AI Systems

A five-day course on building real agentic systems with **LangChain**,
**LangGraph**, and **LangSmith** — from a single tool-calling agent to
stateful, multi-agent systems with memory, retrieval, human-in-the-loop
approval, and production hardening.

**[Visit the site](https://mohammadyusif.github.io/agentic-ai-systems/)**

## Credit

**Days 1–4 — lessons, notebooks, and assignments 1–5 — were written by
[Hassan Algoz](https://github.com/HassanAlgoz/agentic-ai-systems)** and are
reproduced here unchanged, with attribution. This repo adds a sidebar,
next/previous navigation, and a layout meant to make it easier to read a
lesson and follow its code on the same page.

**Day 5, the Capstone Prep page, and assignments 6–9 are additional material
by Mohammad Yusif**, written to extend the course to five days and to close
the gaps most often seen in submitted capstone projects.

## Outline

**Day 1 — Overview & Agents**

1. Introduction: What is Agentic AI
2. Agents
3. Sub Agents

**Day 2 — Retrieval & RAG**

4. Retrieval & RAG
5. Embeddings
6. Semantic Search
7. RAG Chain and RAG Agent

**Day 3 — Memory & State**

8. Context and State
9. Customer Support Agent

**Day 4 — LangGraph & LangSmith**

10. Thinking in LangGraph
11. Workflow Patterns
12. LangSmith

**Day 5 — Reliability & Production** *(new)*

13. Long-Term Memory — the Store vs. the checkpointer
14. Reliability — `RetryPolicy` and the four error strategies, made runnable
15. LangSmith Lab — from zero to a real trace, then evaluation
16. Production — durable state, secrets, guardrails, serving the graph

**Capstone**

- [Capstone Prep](L01/capstone_prep.qmd) — each rubric section mapped to the
  lesson that teaches it, what full marks looks like, and the mistake that
  most often costs the points.

## Why Day 5 exists

Days 1–4 teach every concept the capstone is graded on, but three of them are
covered in reading rather than in a runnable notebook — and those three are
exactly where submitted projects lose the most points:

| Gap | Was | Now |
|---|---|---|
| Long-term memory (`InMemoryStore`) | Not demonstrated anywhere | `12_long_term_memory.qmd`, with a cross-thread proof |
| `RetryPolicy` and error strategies | Explained in prose in `09_langgraph.qmd` | `13_reliability.qmd`, with a retry you watch fire |
| LangSmith | Five links to external docs | `14_langsmith_lab.qmd`, real trace + evaluation |

Days 3 and 4 also had no assignments; assignments 6–9 now cover Days 3–5.

## Building the site locally

This is a [Quarto](https://quarto.org) website. Notebooks already contain
saved outputs, so rendering does not re-execute them or require API keys.

```
quarto render
quarto preview
```

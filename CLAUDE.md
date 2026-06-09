<!-- ai-coding-config:graphify-start -->
## graphify

This project has a knowledge graph at graphify-out/. For architecture or broad codebase discovery, the FIRST tool call must be `rtk graphify query "<question>"`; do not run ls/which/test or read source first. Use at most 3 Graphify calls total: the initial query plus at most 2 follow-up query/path/explain calls, then hard stop all Graphify calls and synthesize the answer. Read GRAPH_REPORT.md only when scoped Graphify results are insufficient or the user asks for a broad report. Targeted raw reads are allowed for specific edits and debugging.

Rules:
- For an architecture question, the FIRST tool call must be one broad `rtk graphify query "<question>"`. Do not check Graphify with `ls`, `which`, or `test` first.
- Use at most 3 Graphify calls total: the initial query plus at most 2 follow-up `query`, `path`, or `explain` calls. After the third call, hard stop all Graphify calls and synthesize the answer from available context.
- Dirty `graphify-out/` files are expected after hooks or incremental updates and are not a reason to skip Graphify.
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only when scoped queries are insufficient or the user requests a broad report.
- After Graphify discovery, targeted raw reads are allowed for editing or debugging specific code.
- After modifying code, run `graphify update .`.
<!-- ai-coding-config:graphify-end -->

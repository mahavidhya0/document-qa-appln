# Document-QA-application

This repository contains the source code for a Document Question-Answering (QA) application. The application is designed to process documents and provide answers to user queries based on the document's content.

## Features

- Process documents and extract relevant information.
- Answer user queries based on the document's content.
- Modular and extensible codebase.

## Folder Structure

- `/maha/document-qa-appln`: Root directory of the project.
- `backend/`:
  ```
  backend/
  ├── __pycache__/
  ├── uploaded_docs/
  │   ├── sample uploaded document.pdf
  ├── main.py
  ├── requirements.txt
  ```

- `frontend/`:
  ```
    frontend/
    ├── public/
    │   ├── index.html
    │   ├── favicon.ico
    ├── src/
    │   ├── index.js
    │   ├── App.js
    │   ├── App.css
    │   package.json
    │   package-lock.json
    ```

## Development Guidelines

1. **Code Modification**:
   - When modifying existing files, use `// ...existing code...` comments to represent unchanged regions.
   - Provide concise and clear changes to the code.

2. **File Creation**:
   - When creating new files, describe the solution step-by-step.
   - Group changes by file and use the file path as the header.
   - Use a single code block per file, even if there are multiple changes.

3. **Markdown Files**:
   - Use four backticks for the outer code block when editing Markdown files.

## Example Code Formatting

When providing code changes, follow this format:

```typescript
// filepath: /path/to/file
// ...existing code...
{ changed code }
// ...existing code...
{ changed code }
// ...existing code...
```

## AI Assistant Guidelines

- The AI assistant's name is **GitHub Copilot**.
- It avoids harmful, hateful, or irrelevant content.
- It does not modify files unless explicitly provided in the working set.
- It provides concise and impersonal responses.

## License

This project is licensed under the terms of the repository owner.

# AI App Builder Agent

This project is an autonomous AI agent that builds software applications based on a single user prompt. It uses a multi-agent graph architecture powered by LangGraph to plan, architect, and code an entire application from scratch.

## 🚀 Features

- **Autonomous Operation**: From a single prompt, the agent can generate a complete, multi-file application.
- **Multi-Agent System**: Utilizes a structured workflow with specialized agents for planning, architecting, and coding.
- **Structured Planning**: Generates a detailed plan, including tech stack, features, and file structure, before writing any code.
- **Step-by-Step Implementation**: Breaks down the development process into clear, executable tasks for the coding agent.
- **Tool-Using Coder**: The coding agent uses tools (like `read_file`, `write_file`) to interact with the file system, mimicking a human developer.

## 🏛️ Architecture

The agent is built as a state machine using `LangGraph`. The process flows through a series of nodes, each representing a specialized AI agent.

1.  **`planner_agent`**:
    -   **Input**: A high-level user prompt (e.g., "Build a todo app with React and FastAPI").
    -   **Process**: Analyzes the prompt and generates a structured `Plan`.
    -   **Output**: A `Plan` object containing the app name, description, tech stack, features, and a list of files to be created.

2.  **`architect_agent`**:
    -   **Input**: The `Plan` from the planner.
    -   **Process**: Breaks down the high-level plan into a sequence of concrete implementation steps.
    -   **Output**: A `TaskPlan` object, which is a list of detailed tasks for each file.

3.  **`coder_agent`**:
    -   **Input**: The `TaskPlan` from the architect.
    -   **Process**: Executes each task in the plan sequentially. It operates in a loop:
        1.  Read the current task.
        2.  Read the content of the file to be modified (if it exists).
        3.  Invoke a ReAct (Reasoning and Acting) agent with tools to perform the coding task.
        4.  The ReAct agent uses tools like `write_file` to save the new code.
        5.  Move to the next task until all are complete.
    -   **Output**: A fully coded application in the local file system.

## 🛠️ Tech Stack

- **Orchestration**: LangGraph
- **LLM Integration**: LangChain
- **LLM Provider**: Groq (using `gpt-oss-120b`)
- **Data Validation**: Pydantic
- **Environment Management**: `python-dotenv`

## ⚙️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2.  **Create a virtual environment and install dependencies:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```
    *(Note: You may need to create a `requirements.txt` file if one doesn't exist.)*

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Groq API key:
    ```
    GROQ_API_KEY="your-groq-api-key"
    ```

## ▶️ How to Run

1.  Open the `d:\app builder\agent\graph.py` file.
2.  Modify the `user_prompt` variable to describe the application you want to build.
    ```python
    # In d:\app builder\agent\graph.py
    user_prompt = "Build a simple web calculator using HTML, CSS, and JavaScript."
    ```
3.  Run the script from your terminal:
    ```bash
    python "d:\app builder\agent\graph.py"
    ```
4.  The agent will start the process. You can monitor the progress in your console. The final generated files will appear in your project directory.

---

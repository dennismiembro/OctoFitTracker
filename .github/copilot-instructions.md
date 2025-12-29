Project: OctoFit Tracker — quick orientation for AI coding agents

Purpose: Help AI agents become productive quickly by describing project layout,
developer workflows, and repository-specific patterns discovered in the codebase.

Key paths
- **Project root**: repository root contains high-level docs and examples: [README.md](README.md)
- **Backend**: octofit-tracker/backend/ — Django app + `venv` and `requirements.txt`
- **Frontend**: octofit-tracker/frontend/ — React app created/managed with npm
- **Docs & assets**: [docs/octofit_story.md](docs/octofit_story.md)
- Existing agent guidance: .github/instructions/*. See [/.github/instructions](.github/instructions)

Big-picture architecture
- Two primary services: a Django REST backend (API, auth, ORM) and a React frontend.
- Data: backend uses Django ORM; MongoDB is expected as the data store (djongo/pymongo listed),
  but agents should always prefer Django ORM patterns rather than raw Mongo scripts.

Important conventions and patterns
- Never change directories when running commands in agent mode — always reference full paths.
  Example: `python3 -m venv octofit-tracker/backend/venv` (do not `cd` into backend).
- Forwarded ports (do not alter): `8000` (public), `3000` (public), `27017` (private).
- Serializers must convert MongoDB `ObjectId` fields to strings before JSON serialization.
- `settings.py` uses a Codespaces-aware ALLOWED_HOSTS pattern. Follow this pattern when
  generating or modifying settings (see `.github/instructions/octofit_tracker_django_backend.instructions.md`).
- API testing convention: use `curl` for quick endpoint checks in PRs and debugging.

Developer workflows (concrete commands)
- Create backend venv:

```bash
python3 -m venv octofit-tracker/backend/venv
source octofit-tracker/backend/venv/bin/activate
pip install -r octofit-tracker/backend/requirements.txt
```

- Start frontend or install packages (always point with `--prefix`):

```bash
npx create-react-app octofit-tracker/frontend --template cra-template --use-npm
npm install --prefix octofit-tracker/frontend bootstrap react-router-dom
# Ensure Bootstrap CSS import is at top of frontend src/index.js as the repo's conventions expect
sed -i "1iimport 'bootstrap/dist/css/bootstrap.min.css';" octofit-tracker/frontend/src/index.js
```

- MongoDB checks and notes:
  - Check for mongod: `ps aux | grep mongod`
  - Use `mongosh` if you need to inspect the DB, but prefer Django ORM for schema/data tasks.

Key files to consult when editing code
- [README.md](README.md) — high-level project notes.
- [.github/instructions/octofit_tracker_setup_project.instructions.md](.github/instructions/octofit_tracker_setup_project.instructions.md)
- [.github/instructions/octofit_tracker_django_backend.instructions.md](.github/instructions/octofit_tracker_django_backend.instructions.md)
- [.github/instructions/octofit_tracker_react_frontend.instructions.md](.github/instructions/octofit_tracker_react_frontend.instructions.md)

What to avoid / agent safety checks
- Do not propose or open additional forwarded ports beyond 8000, 3000, 27017.
- Do not modify system-wide Python packages — use the project `venv` path.
- Avoid direct Mongo scripting to create schema/data; use Django ORM migrations and fixtures instead.

Examples (copyable snippets)
- Codespace-aware ALLOWED_HOSTS snippet (put in `settings.py`):

```python
import os
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
if os.environ.get('CODESPACE_NAME'):
    ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")
```

- Base URL selection used by URL helpers (example found in backend instructions):

```python
import os
codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"
```

Next steps for reviewers
- If anything here is out-of-date or missing a crucial workflow (tests, CI commands, or local dev start steps),
  tell me which developer activity to expand and I will iterate.

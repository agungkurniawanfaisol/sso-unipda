# Skills — UNIPDA Portal

This file documents the AI agent skills installed for this project.

## Installed Skills

### ui-ux-pro-max
- **Source**: `nextlevelbuilder/ui-ux-pro-max-skill`
- **Purpose**: UI/UX design intelligence — plan, build, design, implement, review, improve UI/UX code
- **Styles**: Image-first, editorial design, minimalism, dark mode, responsive
- **Loading**: Use `"skill": { "name": "ui-ux-pro-max" }` in agent prompts
- **Companion skills included**: ckm-banner-design, ckm-brand, ckm-design, ckm-design-system, ckm-slides, ckm-ui-styling

### agent-browser
- **Source**: `vercel-labs/agent-browser`
- **Purpose**: Native Rust-based browser automation CLI for AI agents
- **Installation**: `npm install -g agent-browser && agent-browser install`
- **Key commands**: `snapshot`, `chat`, `click`, `type`, `extract`
- **Docs**: https://github.com/vercel-labs/agent-browser

## How to Install a Skill

```bash
npx skills add <owner/repo@skill> -g -y
```

Flags:
- `-g` — Install globally (user-level)
- `-y` — Skip confirmation prompts

## How to Use a Skill in Prompts

```json
{
  "skill": {
    "name": "ui-ux-pro-max"
  }
}
```

Or mention `@skill-name` in your message to spawn the skill.

## Browse Available Skills

```bash
npx skills find [query]
```

Or visit https://skills.sh/

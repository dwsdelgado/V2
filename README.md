# Auren Portfolio

A modern, responsive portfolio website built with Astro, React, and Tailwind CSS. This project features a clean design that automatically generates both web and print versions from JSON data files, achieving perfect Lighthouse scores and full SEO optimization.

## Quick Start

### Installation

2. **Install dependencies**
   ```bash
   npx pnpm install
   ```
   
   > **Note**: I recommend using pnpm as it provides better performance and reliability, especially when deploying to Cloudflare Pages.

3. **Set up environment variables**
   
   Open the `.env` file in the root directory to insert your own values for the following variables:
   ```env
   GITHUB_TOKEN=your_github_token_here
   WAKATIME_UUID=your_wakatime_uuid_here
   ```
   
   - `GITHUB_TOKEN`: GitHub API access for fetching repository data. 
     - The QuickStats.astro will search for the github commit count for the user defined at me.json.
     - **This is only needed if you want to also count your commits on private repositories.** 
     - [How to get your GitHub token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)
     - **It's a good idea to have a cache layer to make sure you don't hit the rate limit.**
   - `WAKATIME_UUID`: WakaTime integration for coding statistics. To get it, follow these steps:
      - 1. Login on ([WakaTime](https://wakatime.com)),
      - 2. Inspect your profile picture on the top-right corner of the page. The url should countain your uuid, like: "https://wakatime.com/photo/018c1867-6ef4-46d6-970c-0cb34dbe9ef8?s=420" -> your uuid is "018c1867-6ef4-46d6-970c-0cb34dbe9ef8".

4. **Start the development server**
   ```bash
   npx pnpm run dev
   ```
   
   The site will be available at `http://localhost:4321`

## Available Scripts

| Command                   | Action                                                                                                                 |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------------- |
| `npx pnpm install`       | Installs all dependencies (recommended over npm/yarn for Cloudflare deployment)                                      |
| `npx pnpm dev`             | Starts local development server at `localhost:4321`                                                                   |
| `npx pnpm build`           | Builds production site to `./dist/` directory                                                                        |
| `npx pnpm preview`         | Preview your build locally before deploying                                                                            |

## Customization

### Personal Information

Edit the following files in `src/data/` to customize your portfolio:

- **`me.json`**: Your personal information, bio, and contact details
- **`projects.json`**: Your project portfolio with descriptions, skills, and links
- **`experience.json`**: Your work experience and job history
- **`education.json`**: Your educational background
- **`links.json`**: Social media links and external URLs

## Deployment

You can use any hosting provider, but the project is set up for Cloudflare Pages deployment. To deploy it there, you need to:

   - Publish the project to GitHub
   - Open [Cloudflare Dashboard](https://dash.cloudflare.com) and connect the github repository by going to Compute (Workers) -> Workers & Pages -> Create -> Pages -> Import an existing Git repository -> Get Started -> Select the repository
   - Set the framework preset to `Astro` and click on "Save and Deploy"
   - On the settings of the project on Cloudflare dashboard, add environment variables on "Variables and Secrets":
     - `GITHUB_TOKEN`
     - `WAKATIME_UUID`
   - Remember to redeploy your project after adding the environment variables

## Support

If you have any questions or need help with customization, feel free to contact:

- **Email**: mail@arthurmachado.dev
- **GitHub**: [@arthurrmp](https://github.com/arthurrmp)
- **LinkedIn**: [arthurrmp](https://linkedin.com/in/arthurrmp)

Thank you for using my template! 🚀
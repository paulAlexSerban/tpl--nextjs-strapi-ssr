# Next.js for SSR Template

## Read more:
- [Next.js Website](https://nextjs.org/)

## Architecture
- FE: Next.js, Scss
- BE: Strapi (Headless CMS)
- Database: SQl (SQL Lite and PosgresSQL)
  - Local development - SQLite
  - Remote - PostgrsSQL
- Image storege: Cloudinary

## Notes
- local SQLite database 
  - to backup data RUN:
    - `cp -rfv ./backend/dj-events/.tmp/data.db ./backend/database/`
  - to load backed-up data
    - `cp -rfv ./backend/database/data.db ./backend/dj-events/.tmp/data.db`

## Read more:
- [strapi v4 missing Create is owner policy documentation](https://github.com/strapi/documentation/issues/600)
- [Strapi v4 owner (authored) content example with global policy and middleware](https://github.com/msoler75/strapi4author)
  - examples to show a policy/middleware/controller to manage ownership of content
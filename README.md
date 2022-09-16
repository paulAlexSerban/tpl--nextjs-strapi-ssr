# Next.js for SSR Template

## Read more:
- [Next.js Website](https://nextjs.org/)

## Architecture
- FE: Next.js
- BE: Strapi
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
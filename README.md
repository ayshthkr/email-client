
# Email Client

A basic email client that uses a postgres database to store emails.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_SUPABASE_URL`

`NEXT_PUBLIC_SUPABASE_ANON_KEY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/ayshthkr/email-client.git
```

Go to the project directory

```bash
  cd email-client
```

Install dependencies

```bash
  bun install
```

Start the server

```bash
  bun run start
```


## Screenshots

![App Tutorial Video](https://raw.githubusercontent.com/ayshthkr/email-client/main/public/run.gif)


## Database Setup

You can use any postgres database using the script provided below

```sql
-- Create a table for public profiles
create table
  profiles (
    id uuid references auth.users on delete cascade not null primary key,
    updated_at timestamp with time zone,
    username text unique,
    email text unique constraint username_length check (char_length(username) >= 3)
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for
select
  using (true);

create policy "Users can insert their own profile." on profiles for insert
with
  check (
    (
      select
        auth.uid ()
    ) = id
  );

create policy "Users can update own profile." on profiles
for update
  using (
    (
      select
        auth.uid ()
    ) = id
  );

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user () returns trigger as $$
begin
  -- insert into public.profiles (id, full_name, avatar_url)
  insert into public.profiles (id, username, email)
  values (new.id, SPLIT_PART(new.email, '@', '1'), new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();


-- Emails table creation

create table emails (
  id bigint primary key generated always as identity,
  subject text,
  body text,
  to_email text references public.profiles (email),
  from_email text references public.profiles (email),
  time timestamp with time zone default (now() at time zone 'Asia/Kolkata')
);

alter table emails enable row level security;

-- SELECT Policy
create policy "Enable read access if user email is in to or from field"
on "public"."emails"
as PERMISSIVE
for SELECT
to public
using (
  (( SELECT auth.email() AS email) = from_email) OR (( SELECT auth.email() AS email) = to_email)
);

-- INSERT policy
create policy "Enable insert for users based on email"
on "public"."emails"
as PERMISSIVE
for INSERT
to public
with check (
  (( SELECT auth.email() AS email) = to_email) OR (( SELECT auth.email() AS email) = from_email)
);
```
    
## Tech Stack

[NextJS V14](https://nextjs.org/), [Supabase](https://supabase.com/), [ShadCN UI](https://ui.shadcn.com/)


## Deployment

To deploy this project

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This%20starter%20configures%20Supabase%20Auth%20to%20use%20cookies%2C%20making%20the%20user's%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)


## Authors

- [@ayshthkr](https://www.github.com/ayshthkr)


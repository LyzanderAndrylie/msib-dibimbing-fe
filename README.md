# MSIB Dibimbing.id Fullstack Engineer Study Case - Frontend

A GraphQL app to manage notes using [Next.js](https://nextjs.org/) and [Apollo Client](https://www.npmjs.com/package/@apollo/client).

## Table of Contents

- [MSIB Dibimbing.id Fullstack Engineer Study Case - Frontend](#msib-dibimbingid-fullstack-engineer-study-case---frontend)
  - [Table of Contents](#table-of-contents)
  - [Project](#project)
    - [Commands](#commands)
      - [Install Dependencies](#install-dependencies)
      - [Environment variables](#environment-variables)
      - [Development](#development)
      - [Production](#production)
    - [Structure](#structure)
    - [User Manual](#user-manual)
      - [Welcome Page](#welcome-page)
      - [Access All Notes](#access-all-notes)
        - [Empty State](#empty-state)
        - [Filled State](#filled-state)
        - [Sorted State](#sorted-state)
      - [Access Specific Note](#access-specific-note)
      - [Create Note](#create-note)
      - [Change Note Details](#change-note-details)
      - [Delete Note](#delete-note)
    - [Misc](#misc)
      - [Responsive Design](#responsive-design)
      - [Error Handling](#error-handling)
      - [Access non-existing note](#access-non-existing-note)
      - [Network Error](#network-error)

## Project

### Commands

#### Install Dependencies

```shell
npm i
```

#### Environment variables

To set up the environment variables, please add the following key-value pairs to the `.env` file:

```env
NEXT_PUBLIC_BE_API_URL=http://localhost:4000/graphql
```

Notes:

- `NEXT_PUBLIC_BE_API_URL`: GraphQL API URL ([msib-dibimbing-be](https://github.com/LyzanderAndrylie/msib-dibimbing-be)).

#### Development

Run the app in development mode with the following command:

```shell
npm run dev
```

#### Production

Run the app in production mode with the following command:

```shell
npm run build
npm run start
```

### Structure

- `src`: contains all the source code for the app.
  - `app`: contains all the source code related to Next.js routing, pages, layouts, and providers.
    - `page.tsx`: welcome page.
    - `notes`
      - `page.tsx`: notes management page.
      - `[id]`
        - `page.tsx`: note detail page.
  - `components`: contains all reusable components for the app.
  - `lib`: contains GraphQL query and mutation functionality for the app.
    - `apollo/client.ts`: Apollo client for React Server Components (RSC).
    - `types/note.tsx`: contains type definitions for the app.
    - `actions.ts`: contains server actions to mutate data.
    - `data.ts`: contains the code to query data.

### User Manual

#### Welcome Page

![Welcome Page](./screenshot/welcome_page.png)

Click `Try Now` button to access all notes.

#### Access All Notes

##### Empty State

![Empty state](./screenshot/all_notes_empty_state.png)

##### Filled State

![Filled state](./screenshot/all_notes_filled_state.png)

##### Sorted State

By default, the notes will be sorted in descending order (the newest first). But, we can change the behaviour by select `Oldest` from `Sort By:`.

![Sorted State](./screenshot/all_notes_sorted_state.png)

#### Access Specific Note

Hover over a specific note card and click it. This will navigate you to the corresponding note's page.

![Hover to Specific Note](./screenshot/all_notes_hover.png)

![Specific Note Page](./screenshot/specific_note.png)

#### Create Note

Click the `+` button on the notes management page. This will show you a modal to fill in the information about your new note.

![Create Note Modal](./screenshot/create_note_modal.png)

Fill in the necessary information about your new note. Both of fields is required. If you don't fill one of them, the error will show up to indicate which part is wrong.

![Create Note Error](./screenshot/create_note_error.png)

If you fill the correct information, the result will be like the following.

![Create Note Success](./screenshot/create_note_success.png)

#### Change Note Details

Click the`edit` button on the specific note page.
![Specific Note Edit Button](./screenshot/specific_note_edit_button.png)

Fill in the information to update your note. If you don't fill one of them, the error will show up to indicate which part is wrong.

![Specific Note Edit Error](./screenshot/specific_note_edit_error.png)

If you fill the correct information, the result will be like the following.

![Specific Note Edit Success](./screenshot/specific_note_edit_success.png)

#### Delete Note

Access the note management page or the specific note page to delete note. Click the `trash` button to delete note. The result will be like the following.

![Delete Note Confirmation](./screenshot/delete_note_confirmation.png)

Click the `Yes` button to delete note. The result will be like the following.

![Delete Note Success](./screenshot/delete_note_success.png)

If you delete note from the specific note page, you will automatically be redirected to the note management page.

![Specific Note Delete Button](./screenshot/specific_note_delete_button.png)
![Specific Note Delete Confirmation](./screenshot/specific_note_delete_confirmation.png)
![Specific Note Delete Redirection](./screenshot/specific_note_delete_redirection.png)

### Misc

#### Responsive Design

The app support all resolution!

![All Notes Mobile](./screenshot/all_notes_mobile.png)
![Specific Note Mobile](./screenshot/specific_note_mobile.png)
![Create Note Mobile](./screenshot/create_note_mobile.png)
![Update Note Mobile](./screenshot/edit_note_mobile.png)
![Delete Note Mobile](./screenshot/delete_note_mobile.png)

#### Error Handling

The app handle common error in the app.

#### Access non-existing note

![Not Exist Note](./screenshot/not_exist_note.png)

#### Network Error

![All Notes Network Error](./screenshot/all_notes_network_error.png)

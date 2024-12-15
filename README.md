# D Menu - What do you like to Cook with?

This is a Ruby on Rails application integrated with React using the [react-on-rails](https://github.com/shakacode/react_on_rails) gem. The frontend is built with TypeScript, and the app is deployed on [Render](https://render.com).

## Table of Contents

- [Getting Started](#getting-started)
  - [System Requirements](#system-requirements)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
    - [Running Database Seeds](#running-database-seeds)
- [Running the Application](#running-the-application)
  - [Starting the Rails Server](#starting-the-rails-server)
  - [Running Shakapacker Dev Server](#running-shakapacker-dev-server)
- [Deployment on Render](#deployment-on-render)
- [User Stories](#user-stories)

---

## Getting Started

Follow the steps below to setup the app, installing dependencies and creating database.

### System Requirements

- Ruby: `>= 3.0`
- Rails: `>= 7.0`
- Node.js: `>= 22`
- Yarn: `>= 1.22`
- PostgreSQL: `>= 17`

---

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Ruby Dependencies**

   ```bash
   bundle install
   ```

3. **Install JavaScript Dependencies**

   ```bash
   yarn install
   ```

4. **Development env setup**
   To setup a development evnerionment considering installing a formatter and a linter for both frontend and backend code.

   In the context of this project, it was used visualCode as IDE, setting up Prettier as the formatter and Eslint linter to help with coding `.tsx, .ts, .jsx, .js` react components files. On backend side, it was used Rubocop.

   1. To setup Prettier, follow the steps in its offical [documentation](https://prettier.io/docs/en/install.html)

   2. Rubocop configuration file is define within the project and works already as a linter. In order to make it work as a formatter, you will need to install `gem install rubocop` and visualCode extension (see offical [docs](https://github.com/rubocop/vscode-rubocop))

---

### Database Setup

1. **Create and Migrate the Database**

   ```bash
   bin/rails db:create db:migrate
   ```

2. **Running Database Seeds**
   To populate the database with seed data, run:
   ```bash
   bin/rails db:seed
   ```

---

## Running the Application (Locally)

### Starting the Rails Server

To start the Rails server:

```bash
bin/rails server
```

The server will be available at `http://localhost:3000`.

### Running Shakapacker Dev Server

The `shakapacker` dev server compiles your frontend assets separately for hot-reloading.

Run the dev server with:

```bash
bin/webpack-dev-server
```

Make sure both the Rails server and Webpack dev server are running simultaneously.

---

## Deployment on Render

To deploy the application on [Render](https://render.com), it was followed these steps:

1. **Set Up a Render build script**
   Render build file is set as below

   ```
      #!/usr/bin/env bash
      # exit on error
      set -o errexit

      yarn install
      bundle install
      bundle exec rails assets:precompile
      bundle exec rails assets:clean

      bundle exec rails db:migrate
      bundle exec rails db:seed:recipes
   ```

2. **Configure Node and Yarn Versions**
   In your `render.yaml` or build settings, specify the Node.js and Yarn versions.

3. **Create a Service in Render.com**
   Follow the steps to create a service in render in official [docs](https://render.com/docs/deploy-rails)

---

## Access application on Render

Access app on https://mysite-jgz3.onrender.com

## User Stories

### Story 1: Adding Ingredients to the Form

As a user, I want to add ingredients to a form, so that I can search for recipes that include those ingredients.

**Acceptance Criteria:**

- Users can input ingredient names into a form field.
- Users can add multiple ingredients by entering them one by one.
- Added ingredients are displayed as a list in the form.
- Users can remove ingredients from the list if needed.

---

### Story 2: Viewing Recipe Recommendations with "Any" Scope

As a user, I want to retrieve recipes that include at least one of the ingredients I have entered, so that I can see a variety of recipe options.

**Acceptance Criteria:**

- Users can select the "Any" scope for recipe recommendations.
- The system returns recipes containing at least one of the entered ingredients.
- Recipes are displayed in a list format with their names, ingredients, and a brief description.

---

### Story 3: Viewing Recipe Recommendations with "All" Scope

As a user, I want to retrieve recipes that include all the ingredients I have entered, so that I can find recipes that match my exact input.

**Acceptance Criteria:**

- Users can select the "All" scope for recipe recommendations.
- The system returns recipes that contain all the entered ingredients.
- Recipes are displayed in a list format with their names, ingredients, and a brief description.

---

### Story 4: Copying Recipe Information

As a user, I want to copy all the information from a recipe card, so that I can easily save or use the recipe details.

**Acceptance Criteria:**

- Each recipe card includes a "Copy All Info" button.
- Clicking the button copies all recipe details (e.g., name, ingredients, and instructions) to the clipboard.
- A confirmation message (e.g., "Recipe information copied!") is displayed after successful copying.

---

### Story 5: Sharing Recipes on Bluesky

As a user, I want to share a recipe on Bluesky, so that I can easily let others know about a recipe.

**Acceptance Criteria:**

- Each recipe card includes a "Share" button for Bluesky.
- Clicking the button opens a share dialog or redirects the user to a Bluesky post creation page.
- The recipe details (e.g., name, ingredients, and a link) are pre-filled in the Bluesky post.
- Users can modify the content before sharing.

---

### Story 6: Switching Between "All" and "Any" Scopes

As a user, I want to toggle between "All" and "Any" scopes for recipe recommendations, so that I can customize the level of match I want for recipes.

**Acceptance Criteria:**

- Users can toggle between "All" and "Any" scopes using a dropdown or toggle switch.
- Changing the scope updates the recipe recommendations dynamically based on the selected mode.
- A label or icon clearly indicates the active scope.

**Acceptance Criteria:**

- Users can input multiple ingredients as search criteria.
- The system returns recipes that include all the entered ingredients.
- Recipes are displayed with their names and associated ingredients.

---

## Additional Notes

- **React-on-Rails**:

- React components are registered in the `app/javascript/components/${client or server}-bundle.ts` folder. For client or server rendered files, register in the correspondent file.

  - Use `react_on_rails` helpers in Rails views to render React components.

- **Debugging**:
  - Use the Rails logs for server-side issues and the browser console for React/TypeScript errors.
  - Also any errors in typescript compiling will be logged by shakapacker-dev-server running.

# Comprehensive Guide to Creating and Publishing a Bun Package to GitHub Packages

## Prerequisites

- GitHub Account
- Bun installed
- Git installed

## Step 1: Package Structure Overview

```
expense-shared-utils/
│
├── src/
│   ├── index.ts
│   └── crypto.ts
│
├── index.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Step 2: Authentication with GitHub Packages

### 2.1 Create a Personal Access Token

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with:
   - `read:packages`
   - `write:packages`

### 2.2 Configure npm/bun

```bash
# Login to GitHub Packages
npm login --registry=https://npm.pkg.github.com
# Or
bun x npm-cli-login \
  -u YOUR_GITHUB_USERNAME \
  -p YOUR_PERSONAL_ACCESS_TOKEN \
  -e YOUR_EMAIL \
  -r https://npm.pkg.github.com
```

## Step 3: Preparing for Publishing

### 3.1 Build Configuration

```json
{
  "scripts": {
    "build": "bun build ./src/index.ts --outdir ./dist --target=bun",
    "prepublishOnly": "bun run build"
  }
}
```

### 3.2 Type Declarations

In your package's root directory, create a index.d.ts - `index.d.ts` file:

```typescript
declare module "@vinodhj/expense-shared-utils" {
  // Define your module's exports here
  export function someFunction(): void;
  export const someVariable: string;
  // Add more type declarations as needed
}
```

**Add Types to package.json**:
In your package's package.json, ensure you have a types or typings field:

```json
"types": "./index.d.ts",
```

## Step 4: Publishing the Package

### 4.1 Build and Publish

```bash
# Increment the version bump in package.json
{
  "name": "@vinodhj/expense-shared-utils",
  "version": "1.1.0", // ← Increment this(v1.0.0 - v1.1.0)
  ...
}

# Save the changes and commit to repo
git add --all && git commit -m "Your changes"

# Create and push a git tag
git tag v1.1.0
git push origin main v1.1.0

# Build the package
bun run build

# Publish to GitHub Packages
npm publish
```

## Step 5: Using the Package in Another Project

### 5.1 Configure .npmrc

Create a `.npmrc` file in your project root:

```
//npm.pkg.github.com/:_authToken=TOKEN
@<githubusername>:registry=https://npm.pkg.github.com
```

### 5.2 Install the Package

```bash
# Install specific version
bun add @vinodhj/expense-shared-utils@3.0.0

# Or use GitHub repository reference
bun add "github:vinodhj/expense-shared-utils#v3.0.0"
```

### 5.3 Use in Your Code

```typescript
import {
  generateHmacSignature,
  generateNonce,
} from "@vinodhj/expense-shared-utils";

async function example() {
  const signature = await generateHmacSignature("secret", "payload");
  const nonce = generateNonce();
  console.log(signature, nonce);
}
```

## Usage

```typescript
import {
  generateHmacSignature,
  generateNonce,
} from "@vinodhj/expense-shared-utils";

// Example usage
const signature = await generateHmacSignature("secret", "payload");
const nonce = generateNonce();
```

### Common Issues

- Ensure GitHub token has correct permissions
- Verify `.npmrc` is correctly configured
- Check that you're logged in

### Versioning

- Always increment version before publishing
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Create git tags for each release

## Best Practices

- Keep packages focused
- Write clear documentation
- Use TypeScript for type safety
- Include comprehensive README

## Pro Tips

- Consider GitHub Actions for automated publishing
- Create release notes with each version
- Use semantic-release for automated versioning

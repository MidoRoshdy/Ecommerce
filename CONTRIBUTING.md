# 🤝 Contributing to E-Store

Thank you for your interest in contributing to E-Store! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guides](#style-guides)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- **Be respectful** of differing opinions and viewpoints
- **Be collaborative** and work together
- **Be constructive** in your feedback
- **Be inclusive** and welcoming to all contributors

## 🚀 How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Include detailed steps to reproduce
- Include browser/device information
- Include screenshots if applicable

### Suggesting Enhancements

- Use the GitHub issue tracker
- Describe the enhancement clearly
- Explain why this enhancement would be useful
- Include mockups if applicable

### Pull Requests

- Fork the repository
- Create a feature branch
- Make your changes
- Test thoroughly
- Submit a pull request

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ecomerce-1.git
   cd ecomerce-1
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Pull Request Process

### Before Submitting

1. **Ensure your code follows the style guide**
2. **Add tests if applicable**
3. **Update documentation if needed**
4. **Test your changes thoroughly**

### Pull Request Guidelines

1. **Use a clear and descriptive title**
2. **Provide a detailed description of changes**
3. **Include screenshots for UI changes**
4. **Reference any related issues**

### Example Pull Request

```markdown
## Description

Added user profile page with avatar upload functionality.

## Changes Made

- Created new Profile component
- Added avatar upload with drag-and-drop
- Implemented profile data persistence
- Added form validation

## Screenshots

![Profile Page](screenshots/profile.png)

## Testing

- [x] Tested on Chrome, Firefox, Safari
- [x] Tested responsive design
- [x] Verified form validation
- [x] Tested avatar upload

## Related Issues

Closes #123
```

## 🎨 Style Guides

### JavaScript/React

- Use functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow ESLint configuration

```javascript
// ✅ Good
const ProductCard = ({ product, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
};

// ❌ Bad
const ProductCard = (props) => {
  const click = () => {
    props.onAddToCart(props.product);
  };

  return (
    <div>
      <img src={props.product.image} />
      <h3>{props.product.title}</h3>
      <button onClick={click}>Add</button>
    </div>
  );
};
```

### CSS/Tailwind

- Use Tailwind CSS utility classes
- Keep custom CSS minimal
- Use consistent spacing and colors
- Follow responsive design principles

```css
/* ✅ Good - Use Tailwind classes */
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">

/* ❌ Bad - Avoid custom CSS when possible */
<div className="custom-card">
```

### Git Commit Messages

- Use conventional commit format
- Be descriptive and concise
- Reference issues when applicable

```bash
# ✅ Good
feat: add user profile page with avatar upload
fix: resolve cart item quantity update issue
docs: update README with deployment instructions

# ❌ Bad
update
fix bug
add stuff
```

## 🐛 Reporting Bugs

### Before Creating an Issue

1. **Check existing issues** to avoid duplicates
2. **Test on different browsers** to isolate the problem
3. **Try to reproduce** the issue consistently

### Issue Template

```markdown
## Bug Description

Brief description of the bug.

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Environment

- Browser: Chrome 120.0.6099.109
- OS: Windows 11
- Device: Desktop

## Screenshots

If applicable, add screenshots to help explain the problem.

## Additional Context

Any other context about the problem.
```

## 💡 Suggesting Enhancements

### Before Creating an Enhancement Request

1. **Check existing issues** for similar requests
2. **Consider the impact** on existing functionality
3. **Think about implementation** complexity

### Enhancement Template

```markdown
## Enhancement Description

Brief description of the enhancement.

## Problem Statement

What problem does this solve?

## Proposed Solution

How would you like to see this implemented?

## Alternative Solutions

Any alternative solutions you've considered.

## Additional Context

Any other context, mockups, or examples.
```

## 📚 Documentation

### Code Comments

- Add comments for complex logic
- Use JSDoc for function documentation
- Keep comments up to date

```javascript
/**
 * Adds a product to the user's wishlist
 * @param {string} productId - The ID of the product to add
 * @param {string} token - User authentication token
 * @returns {Promise<boolean>} Success status
 */
const addToWishlist = async (productId, token) => {
  // Implementation
};
```

### README Updates

- Update README when adding new features
- Include screenshots for UI changes
- Update installation instructions if needed

## 🧪 Testing

### Manual Testing

- Test on multiple browsers
- Test responsive design
- Test accessibility features
- Test error scenarios

### Automated Testing

- Add unit tests for new features
- Add integration tests for critical paths
- Ensure test coverage doesn't decrease

## 🚀 Deployment

### Testing Before Deployment

1. **Build the project locally:**

   ```bash
   npm run build
   ```

2. **Test the production build:**

   ```bash
   npm start
   ```

3. **Check for console errors**
4. **Test all major functionality**

## 📞 Getting Help

- **GitHub Issues:** For bugs and feature requests
- **GitHub Discussions:** For questions and general discussion
- **Documentation:** Check README and code comments

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- GitHub contributors page
- Release notes

---

**Thank you for contributing to E-Store!** 🎉

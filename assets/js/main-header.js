// This is the full content for assets/js/main-header.js

// 1. We define all your header HTML in one place.
// NOTICE: All links are now "absolute" (they start with https://)
// so they work from any of your subdomains.

const headerHTML = `
<header id="main-header">
  <nav class="h-16">
    <div class="content-container h-full">
      <div class="flex justify-between items-center h-full px-6">
        <div class="flex items-center space-x-8">
          <a href="https://www.happymachinesandhumans.com/" class="font-bold text-xl">Happy Machines and Humans</a>
          <div class="hidden md:flex items-center space-x-6">
            <a href="https://www.happymachinesandhumans.com/#ai-expertise" class="text-sm font-medium hover-underline">AI Expertise</a>
            <a href="https://www.happymachinesandhumans.com/#music-production" class="text-sm font-medium hover-underline">Music</a>
            <a href="https://www.happymachinesandhumans.com/#web-engineering" class="text-sm font-medium hover-underline">Web & MIDI</a>
            <a href="https://www.happymachinesandhumans.com/#workflow" class="text-sm font-medium hover-underline">Workflow</a>
          </div>
        </div>
        <div class="flex items-center space-x-6">
          <a href="https://learning.happymachinesandhumans.com/" class="text-sm font-medium hover-underline">Learning</a>
          <a href="https://music.happymachinesandhumans.com/" class="text-sm font-medium hover-underline">Songwriter's Blueprint</a>
        </div>
      </div>
    </div>
  </nav>
</header>
`;

// 2. This creates the new <main-header-component> tag.
// When the page loads this, it automatically runs this code.
class MainHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = headerHTML;
  }
}

customElements.define('main-header-component', MainHeader);
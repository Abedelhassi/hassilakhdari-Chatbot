# Design Guidelines: Gemini Chatbot Application

## Design Approach
**Reference-Based:** Drawing inspiration from ChatGPT, Claude, and modern AI chat interfaces that prioritize clarity, readability, and focused conversation flow.

## Core Design Principles
1. **Conversation-First:** Every design decision supports clear, distraction-free dialogue
2. **Immediate Usability:** Zero learning curve - users should understand the interface instantly
3. **Fluid Interaction:** Seamless message flow with responsive feedback

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 3, 4, 6, 8** for consistent rhythm
- Message spacing: `space-y-4`
- Container padding: `p-6` on desktop, `p-4` on mobile
- Input area: `p-4`

### Structure
- **Full-height layout:** `h-screen flex flex-col`
- **Header:** Fixed top bar (h-16) with app title and subtle branding
- **Chat container:** Flex-grow scrollable area with `max-w-3xl mx-auto`
- **Input area:** Fixed bottom with `max-w-3xl mx-auto`

## Typography

### Font Stack
- **Primary:** Inter or System UI stack via Google Fonts
- **Monospace:** For code blocks in responses (JetBrains Mono)

### Hierarchy
- **App Title:** text-lg font-semibold
- **User Messages:** text-base font-medium
- **AI Messages:** text-base font-normal
- **Timestamps:** text-xs
- **Typing Indicator:** text-sm italic

## Component Library

### Message Bubbles
**User Messages:**
- Aligned right with `ml-auto max-w-[80%]`
- Rounded corners: `rounded-2xl rounded-tr-sm`
- Padding: `px-4 py-3`

**AI Messages:**
- Aligned left with `mr-auto max-w-[80%]`
- Rounded corners: `rounded-2xl rounded-tl-sm`
- Padding: `px-4 py-3`
- Markdown support for formatted responses

### Input Component
- **Container:** Sticky bottom with backdrop blur
- **Text Input:** `rounded-full` design with `px-6 py-3`
- **Send Button:** Circular icon button positioned absolute right
- **Character limit indicator:** Small text below input showing count

### Typing Indicator
Three animated dots in AI message bubble position with pulse animation

### Error State
Toast notification at top of chat area with:
- Alert icon (use Heroicons)
- Error message text
- Dismiss button
- Auto-dismiss after 5 seconds

### Empty State
Centered content when no messages:
- Gemini logo or icon (200x200px)
- Welcome headline: "Chat with Gemini AI"
- Subtitle: "Ask me anything..."
- 3-4 suggested prompts as clickable pills with `rounded-full px-4 py-2`

## Navigation & Controls

### Header
- Left: App title/logo
- Right: Clear chat button (trash icon) with confirmation dialog

### Chat Controls
- Scroll to bottom FAB (floating action button) appears when scrolled up
- Copy message button on hover for each AI response

## Interaction Patterns

### Message Sending
1. User types in input
2. Send button becomes enabled when text exists
3. On send: input clears, user message appears immediately
4. Typing indicator shows in AI position
5. AI response streams in (if using streaming) or appears complete

### Auto-scroll Behavior
- Auto-scroll on new messages ONLY if user is near bottom (within 100px)
- Manual scroll up disables auto-scroll
- "Scroll to bottom" button appears when auto-scroll disabled

### LocalStorage Integration
- Load chat history on mount with fade-in animation
- Save after each message exchange
- Visual indicator when history is restored

## Responsive Behavior

### Desktop (≥1024px)
- Center chat container with `max-w-3xl`
- Generous padding: `px-8`
- Input spans full width of container

### Tablet (768px - 1023px)
- Reduce max-width to `max-w-2xl`
- Padding: `px-6`

### Mobile (<768px)
- Full width with `px-4`
- Stack message bubbles with reduced max-width (90%)
- Simplified header with just title
- Larger touch targets for buttons (min 44px)

## Accessibility
- Keyboard navigation: Enter to send, Escape to clear
- ARIA labels on all interactive elements
- Focus indicators on all focusable elements with `ring-2` pattern
- Screen reader announcements for new messages
- High contrast text ensuring WCAG AA compliance

## Icons
**Library:** Heroicons (via CDN)
- Send: PaperAirplaneIcon
- Clear: TrashIcon  
- Error: ExclamationCircleIcon
- Scroll: ChevronDownIcon
- Copy: ClipboardIcon

## Animation Guidelines
**Minimal and purposeful only:**
- Message appearance: Simple fade-in (150ms)
- Typing indicator: Gentle pulse on dots
- Button states: No animations, instant feedback
- Scroll behavior: Smooth scroll only

## Images
**No hero images needed.** This is a utility application focused entirely on the chat interface.
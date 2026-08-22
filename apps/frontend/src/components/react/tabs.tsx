import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useRef } from 'react';
import gsap from 'gsap';
import { SignInForm, LogInForm } from '@components/react/form';
import '@styles/sass/tabs.scss';

export default function Tabs() {
  const contentRefs = {
    tab1: useRef<HTMLDivElement>(null),
    tab2: useRef<HTMLDivElement>(null),
  };
  const prevTabRef = useRef<string>('tab1');

  const handleTabChange = (value: string) => {
    const prevTab = prevTabRef.current;
    const prevContent = contentRefs[prevTab as keyof typeof contentRefs]?.current;
    const newContent = contentRefs[value as keyof typeof contentRefs]?.current;

    // Exit animation for old content
    if (prevContent) {
      gsap.to(prevContent, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          // Hide old content after animation
          if (prevContent) prevContent.style.display = 'none';
        },
      });
    }

    // Enter animation for new content
    if (newContent) {
      newContent.style.display = 'block';
      gsap.fromTo(
        newContent,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          delay: 0.1, // Small delay for smoother transition
        },
      );
    }

    prevTabRef.current = value;
  };

  return (
    <TabsPrimitive.Root defaultValue="tab1" className="tabs-root" onValueChange={handleTabChange}>
      <TabsPrimitive.List className="tabs-list">
        <TabsPrimitive.Trigger value="tab1" className="tab-trigger">
          Sign In
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger value="tab2" className="tab-trigger">
          Log In
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>

      <div className="content-wrapper">
        <TabsPrimitive.Content value="tab1" className="tabs-content" ref={contentRefs.tab1}>
          <SignInForm />
        </TabsPrimitive.Content>

        <TabsPrimitive.Content value="tab2" className="tabs-content" ref={contentRefs.tab2}>
          <LogInForm />
        </TabsPrimitive.Content>
      </div>
    </TabsPrimitive.Root>
  );
}

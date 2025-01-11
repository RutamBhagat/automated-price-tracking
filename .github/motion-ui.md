# In View Component
In View
Easily animate elements when they come into view. You can apply animations to elements when they enter the viewport, or when they are fully visible.

Examples
Basic in view

Preview
Code
Scroll down
Craft beautiful animated components with Motion-Primitives. Designed for developers and designers. The library leverages the power of Motion, with intuitive APIs that simplifies creating complex animations for any project. Start building more dynamic interfaces today.

Basic in view with margin option
Preview

Code
import { InView } from '@/components/core/in-view';

export function InViewBasicMultiple() {
  return (
    <div className='h-[350px] w-full overflow-y-auto overflow-x-hidden'>
      <div className='mb-36 py-12 text-center text-sm'>Scroll down</div>
      <div className='flex h-[350px] items-end justify-center px-4 pb-24'>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
              scale: 0.95,
              filter: 'blur(4px)',
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='max-w-96 bg-zinc-100 p-4'>
            <p className='text-zinc-600'>
              <strong className='font-medium text-zinc-900'>Athletics.</strong>{' '}
              Watch running, jumping, and throwing events. Athletes compete in
              many different activities.
            </p>
          </div>
        </InView>
      </div>
      <div className='flex h-[350px] items-end justify-center px-4 pb-24'>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              x: 100,
            },
            visible: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='max-w-96 bg-zinc-900 p-4'>
            <p className='text-zinc-400'>
              <strong className='font-medium text-zinc-50'>Swimming.</strong>{' '}
              See swimmers race in water. They use different styles to swim fast
              and win medals.
            </p>
          </div>
        </InView>
      </div>
      <div className='flex h-[350px] items-end justify-center overflow-x-hidden px-4 pb-24'>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              scale: 1.5,
            },
            visible: {
              opacity: 1,
              scale: 1,
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='max-w-96 bg-zinc-100 p-4'>
            <p className='text-zinc-600'>
              <strong className='font-medium'>Gymnastics.</strong> Gymnasts
              perform amazing flips and jumps. They show strength and balance in
              their routines.
            </p>
          </div>
        </InView>
      </div>
    </div>
  );
}
In view with images and margin option
Images are from cosmos - oui are one ::

Preview

Code
'use client';
import { InView } from '@/components/core/in-view';
import { motion } from 'motion/react';

export function InViewImagesGrid() {
  return (
    <div className='h-full w-full overflow-auto'>
      <div className='mb-20 py-12 text-center text-sm'>Scroll down</div>
      <div className='flex h-[1200px] items-end justify-center pb-12'>
        <InView
          viewOptions={{ once: true, margin: '0px 0px -250px 0px' }}
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.09,
              },
            },
          }}
        >
          <div className='columns-2 gap-4 px-8 sm:columns-3'>
            {[
              'https://images.beta.cosmos.so/e5ebb6f8-8202-40ec-bc70-976f81153501?format=jpeg',
              'https://images.beta.cosmos.so/1b6f1bee-1b4c-4035-9e93-c93ef4d445e1?format=jpeg',
              'https://images.beta.cosmos.so/9968a6cf-d7f6-4ec9-a56d-ac4eef3f8689?format=jpeg',
              'https://images.beta.cosmos.so/4b88a39c-c657-4911-b843-b473237e83b5?format=jpeg',
              'https://images.beta.cosmos.so/86af92c0-064d-4801-b7ed-232535b03328?format=jpeg',
              'https://images.beta.cosmos.so/399e2a4a-e118-4aaf-9c7e-155ed18f6556?format=jpeg',
              'https://images.beta.cosmos.so/6ff16bc9-dc94-4549-a057-673a603ce203?format=jpeg',
              'https://images.beta.cosmos.so/d67c3185-4480-4408-8f9d-1cbf541e5d91?format=jpeg',
              'https://images.beta.cosmos.so/a7b19274-3370-4080-b734-e8ac268d8c8e.?format=jpeg',
              'https://images.beta.cosmos.so/551daf0d-77e8-472c-9324-468fed15a0ba?format=jpeg',
            ].map((imgSrc, index) => {
              return (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)',
                    },
                  }}
                  key={index}
                  className='mb-4'
                >
                  <img
                    src={imgSrc}
                    alt={`Image placeholder from cosmos.so, index:${index}`}
                    className='size-full rounded-lg object-contain'
                  />
                </motion.div>
              );
            })}
          </div>
        </InView>
      </div>
    </div>
  );
}
Installation

CLI
Manual
npx shadcn add "https://motion-primitives.com/c/in-view.json"
Component API
Prop	Type	Default	Description
children	ReactNode		The content inside the InView component.
variants	{ hidden: Variant; visible: Variant; }	{ hidden: { opacity: 0 }, visible: { opacity: 1 } }	Variants to define the animation states.
transition	Transition		Specifies the animation transitions.
viewOptions	UseInViewOptions		Options to configure the in-view behavior.
as	React.ElementType	'div'	The HTML element to render the component as.

# Text Effect Component

Text Effect
Easily animate text content with various effects. You can apply animations per character or per word, and customize the animation effects using custom variants or preset animations.

Examples
Text Effect per character

Preview
Code
Animate your ideas with motion-primitivesAnimate your ideas with motion-primitives

Text Effect per word

Preview
Code
Animate your ideas with motion-primitivesAnimate your ideas with motion-primitives
Text Effect with preset

Preview
Code
Animate your ideas with motion-primitivesAnimate your ideas with motion-primitives
Text Effect with custom variants

Preview
Code
Animate your ideas with motion-primitivesAnimate your ideas with motion-primitives

Text Effect with custom delay

Preview
Code
Animate your ideasAnimate your ideas

with motion-primitiveswith motion-primitives

(and delay!)(and delay!)

Text Effect per line

Preview
Code
now live on motion-primitives!
now live on motion-primitives!
now live on motion-primitives!

Text Effect with exit animation

Preview
Code
Animate your ideas with motion-primitives
Animate
 
your
 
ideas
 
with
 
motion-primitives

Text Effect with speed
You can control the speed of the animation by using the speedReveal and speedSegment props.


Preview
Code
Animate your ideas with motion-primitives.Animate your ideas with motion-primitives.

Installation

CLI
Manual
npx shadcn add "https://motion-primitives.com/c/text-effect.json"
Component API
TextEffect
Prop	Type	Default	Description
children	string		The text content to be animated.
per	'word' | 'char' | 'line'	'word'	Defines whether animation applies per word, character, or line.
as	keyof JSX.IntrinsicElements	'p'	The HTML tag to render, defaults to paragraph.
variants	{ container?: Variants; item?: Variants; }	undefined	Custom variants for container and item animations.
className	string	undefined	Optional CSS class for styling the component.
preset	'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'	'fade'	Preset animations to apply to the text.
delay	number	0	Delay before the animation starts.
trigger	boolean	true	Controls whether the animation should be triggered.
onAnimationComplete	() => void	undefined	Callback function when the animation completes.
onAnimationStart	() => void	undefined	Callback function when the animation starts.
segmentWrapperClassName	string	undefined	Optional CSS class for styling segment wrappers.
style	CSSProperties	undefined	Optional inline styles for the component.
containerTransition	Transition	undefined	Optional transition for the container.
segmentTransition	Transition	undefined	Optional transition for the segments.
speedReveal	number	1	Controls the speed of the reveal animation.
speedSegment	number	1	Controls the speed of the animation.

# Animated Background Component

Animated Background
Visually highlights selected items by sliding a background into view when hovered over or clicked. This smooth transition helps users focus on the active item, making it ideal for interactive lists, menus, or navigations where clear selection feedback is important.',

Examples
Animated Tabs

Preview
Code




Animated Tabs Hover

Preview
Code

Home

About

Services

Contact
Animated Card Background

Preview
Code






Segmented Control

Preview
Code

Day

Week

Month

Year
Installation

CLI
Manual
npx shadcn add "https://motion-primitives.com/c/animated-background.json"
Component API
Prop	Type	Default	Description
children	ReactElement with 'data-id' string attribute array or single element		The content to be displayed within the animated background. Each child must have a unique data-id attribute to ensure correct functionality.
defaultValue	string		The default value to be used as the active item identifier.
onValueChange	(newActiveId: string | null) => void		Callback function that is called when the active item changes.
className	string		The class name to apply to the animated background for custom styling.
transition	Transition		The transition effect from motion for animation effects.
enableHover	boolean	false	Enables or disables the hover effect. When enableHover is true, spacing between children cannot be added.


# Text Shimmer Component

Text Shimmer
Shimmer effect on text. Easily adjust the duration and the spread of the shimmer effect.

Examples
Text Shimmer Basic

Preview
Code
Generating code...

Text Shimmer Color
You can use the [--base-color] and [--base-gradient-color] CSS variables to customize the color of the shimmer effect.


Preview
Code
Hi, how are you?

Installation

CLI
Manual
npx shadcn add "https://motion-primitives.com/c/text-shimmer.json"
Component API
TextShimmer
Prop	Type	Default	Description
children	string		The text content.
as	keyof JSX.IntrinsicElements	'p'	The HTML tag to render, defaults to paragraph.
className	string	undefined	Optional CSS class for styling the component.
duration	number	2	The duration of the shimmer effect.
spread	number	2	The spread of the shimmer effect.
Credits
Inspired by JohnPhamous for the idea of the shimmer effect that scales with the content length.


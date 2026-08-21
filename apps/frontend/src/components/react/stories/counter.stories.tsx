import type { Meta, StoryObj } from '@storybook/react-vite';
import Counter from '../counter';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  argTypes: {
    to: {
      type: { name: 'number', required: true },
      control: 'number',
      description: 'The end goal number thats going to be counted up to',
    },
    from: {
      control: 'number',
      description: 'The starting number the counting sequence is going to start from',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    direction: {
      control: 'radio',
      options: ['up', 'down'],
      description:
        'Dictates whether its going to be counted up to the given to parameter or down from it as a starting point',
      table: {
        defaultValue: { summary: 'up' },
      },
    },
    delay: {
      type: 'number',
      control: 'number',
      description: 'Delay before the countdown starts',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    duration: {
      type: 'number',
      control: 'number',
      description: 'Duration of the countdown',
      table: {
        defaultValue: { summary: '2' },
      },
    },
    className: {
      type: 'string',
      control: 'text',
      description: 'Class name of the element with which you can style it',
      table: {
        defaultValue: { summary: '' },
      },
    },
    startWhen: {
      type: 'boolean',
      control: 'boolean',
      description:
        'A boolean to control whether the animation should start when the component is in view. It basically works like an if statement, if this is true, the count will start.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    separator: {
      type: 'string',
      control: 'text',
      description: 'Character to use as a thousands separator in the displayed number.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    onStart: {
      type: 'function',
      control: false,
      description: 'Callback function that is called when the count animation starts.',
    },
    onEnd: {
      type: 'function',
      control: false,
      description: 'Callback function that is called when the count animation ends.',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Counter> = {
  args: {
    to: 100,
    from: 10,
    direction: 'up',
    delay: 0,
  },
};

export const ReallyLongNumber: StoryObj<typeof Counter> = {
  args: {
    to: 100000,
    separator: ',\n',
  },
};

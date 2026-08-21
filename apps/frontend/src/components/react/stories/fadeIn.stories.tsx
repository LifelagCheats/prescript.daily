import type { StoryObj, Meta } from '@storybook/react-vite';
import FadeIn from '../fadeIn';
import './styles/fadeIn.scss';

const meta: Meta<typeof FadeIn> = {
  title: 'Components/Fade in',
  component: FadeIn,
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: {
        name: 'node',
        renderer: 'react',
        required: true,
      },
      control: false,
      description: 'The content inside the component which will be rendered with the animation',
    },
    delay: {
      type: 'number',
      control: 'number',
      description: 'Delay before the animation plays (ms)',
      table: {
        defaultValue: { summary: '0' },
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof FadeIn> = {
  args: {
    children: <span>Hello World</span>,
  },
};

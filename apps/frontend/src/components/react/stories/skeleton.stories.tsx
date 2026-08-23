import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import Skeleton from '@components/react/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      type: { name: 'boolean', required: true },
      control: 'radio',
      options: [true, false],
      table: {
        defaultValue: { summary: 'true' },
      },
      description:
        'Decides whether the skeleton will cover or reveal its children, true by default',
    },
    children: {
      type: {
        name: 'node',
        renderer: 'react',
        required: true,
      },
      control: false,
      description:
        'The content inside the component to which the cover is going to be applied over to',
    },
    className: {
      type: {
        name: 'string',
      },
      control: 'text',
      table: {
        defaultValue: { summary: '' },
      },
      description: 'Class name of the element with which you can style it',
    },
    maxWidth: {
      type: {
        name: 'string',
      },
      control: 'text',
      table: {
        defaultValue: { summary: '5rem ' },
      },
      description: 'Max width per line, if left to be a number will be set to be in pixels',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Skeleton> = {
  args: {
    loading: true,
    children: <span>Hello World!</span>,
  },
};

export const ReallyLongText: StoryObj<typeof Skeleton> = {
  args: {
    loading: true,
    children: (
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat, duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed
        ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo.
      </span>
    ),
  },
};

const SkeletonWithTimer = ({ children, ...props }: ComponentProps<typeof Skeleton>) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Skeleton {...props} loading={loading}>
      {children}
    </Skeleton>
  );
};

export const Paragraph: StoryObj<typeof Skeleton> = {
  render: (args) => <SkeletonWithTimer {...args}>{args.children}</SkeletonWithTimer>,
  args: {
    maxWidth: '20rem',
    children: (
      <span>
        Doesn't work on blocks, though, for blocks you'll need to copy this component across the
        paragraphs
      </span>
    ),
  },
};

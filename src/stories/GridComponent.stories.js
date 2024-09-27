import { useState } from 'react';
import GridComponent from '../components/GridComponent';

export default {
  title: 'GridComponent',
  component: GridComponent,
  argTypes: {
    input: { control: 'text' }, // Adds a text input control to Storybook
  },
};

const Template = (args) => {
  const [input] = useState(args.input || '');

  return (
    <div>
      <GridComponent input={input} />
    </div>
  );
};

export const DefaultGrid = Template.bind({});
DefaultGrid.args = {
  input: '2,2 EAST', // Default input that will be displayed when the story loads
};

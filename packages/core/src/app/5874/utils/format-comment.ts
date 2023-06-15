import { format } from 'date-fns';

const formatComments = (
    comments: string,
    selectedDate: Date,
    narrowRoad: boolean
) => {
    return `${comments}${
        comments ? '\n' : ''
    }Smaller delivery vehicle advised: ${
        narrowRoad ? 'Yes' : 'No'
    }\nSelected delivery date: ${format(selectedDate, 'yyyy-MM-dd')}`;
};

export default formatComments;

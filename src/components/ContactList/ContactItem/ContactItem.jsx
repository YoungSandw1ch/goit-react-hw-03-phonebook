import PropTypes from 'prop-types';
import { Item, Text, Span, CloseButton } from './ContactItem.styled';

export const ContactItem = ({ name, number, id, onDelete }) => {
  return (
    <Item>
      <Text>
        {name}: <Span>{number}</Span>
      </Text>
      <CloseButton type="button" onClick={() => onDelete(id)}>
        delete
      </CloseButton>
    </Item>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

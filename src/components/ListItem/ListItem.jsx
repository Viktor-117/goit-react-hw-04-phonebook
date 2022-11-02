import PropTypes from 'prop-types';
import { ListItemText, Button, Text } from './ListItem.styled';

export const ListItem = ({ id, name, number, onDelete }) => {
  return (
    <ListItemText>
      <Text>
        {name}: {number}
      </Text>
      <Button
        type="button"
        onClick={() => {
          onDelete(id);
        }}
      >
        Delete
      </Button>
    </ListItemText>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

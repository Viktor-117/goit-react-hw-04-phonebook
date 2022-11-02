import PropTypes from 'prop-types';
import { LabelName, FilterInput } from './Filter.styled.js';

export default function Filter({ filter, onChange }) {
  return (
    <LabelName>
      Find contacts by name
      <FilterInput
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={filter}
        onChange={onChange}
      ></FilterInput>
    </LabelName>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormContainer,
  LabelName,
  NameInput,
  Button,
  Error,
} from './PhonebookForm.styled';

let schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().min(4).required(),
});

export default function PhonebookForm({ onSubmit }) {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit({
      id: nanoid(),
      name: values.name,
      number: values.number,
    });
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormContainer autoComplete="off">
        <LabelName>
          Name
          <NameInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <Error name="name" component="div" />
        </LabelName>
        <LabelName>
          Number
          <NameInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <Error name="number" component="div" />
        </LabelName>
        <Button type="submit">Add contact</Button>
      </FormContainer>
    </Formik>
  );
}

import { RiFolderUserFill } from 'react-icons/ri';

// read-only
export default {
  name: 'account',
  title: 'Account',
  type: 'document',
  icon: RiFolderUserFill,
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: Rule => Rule.required(),
      readOnly: true
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: Rule => Rule.required(),
      readOnly: true
    },
    {
      name: 'firstname',
      title: 'First Name',
      type: 'string',
      readOnly: true
    },
    {
      name: 'lastname',
      title: 'Last Name',
      type: 'string',
      readOnly: true
    },
    {
      name: 'birthday',
      title: 'Date of Birth',
      type: 'date',
      readOnly: true
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
      validation: Rule => Rule.regex(/^\d*$/)
    },
    {
      name: 'address',
      title: 'Shipping Address',
      type: 'text',
      readOnly: true
    }
  ]
}
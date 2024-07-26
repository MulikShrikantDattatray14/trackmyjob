import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext, redirect } from 'react-router-dom';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useDashboardContext } from '../pages/DashboardLayout';
import { IoLocationSharp } from "react-icons/io5";
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if (file && file.size > 500000) {
      toast.error('Image size too large');
      return null;
    }
    try {
      await customFetch.patch('/users/update-user', formData);
      queryClient.invalidateQueries(['user']);
      toast.success('Profile updated successfully');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };

const Profile = () => {
  // const { user } = useOutletContext();
 
  // const { name, lastName, email, location } = user;
  //const { user } = useOutletContext();
 
  const { user: {name, lastName, email, location} } =useOutletContext();
  const { user: my_photo} = useDashboardContext();
  console.log(my_photo)


  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Hello, {name}</h4>
        
        <div className='form-center'>
        
        
        {/* <IoLocationSharp /> */}
          <div className='form-row'>
          <img src={my_photo.avatar} alt='avatar' className='img' />
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5 MB)
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <div className='form-row'><FormRow type='text' name='name' defaultValue={name} />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            defaultValue={lastName}
          />
          <FormRow type='email' name='email' defaultValue={email} />
          <FormRow type='text' name='location' defaultValue={location} />
          <SubmitBtn formBtn /></div>
          
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;

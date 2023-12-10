import {Button} from '@/components/button'
import {Radio} from '@/components/checkbox'
import {Field} from '@/components/field'
import {Input} from '@/components/input'
import {Label} from '@/components/label'
import {useForm} from 'react-hook-form'
import slugify from 'slugify'
import {postStatus} from '../../utils/constants'
import DashboardHeading from '../dashboard/DashboardHeading.jsx'
import {FieldCheckboxes} from '../../components/field'
import ImageUpload from '../../components/image/ImageUpload'
import useFirebaseImage from '../../hooks/useFirebaseImage'

const PostAddNew = () => {
  const {control, watch, setValue, handleSubmit, getValues, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      hot: false,
      image: '',
      category: {},
      user: {}
    }
  })
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage
  } = useFirebaseImage(setValue, getValues)
  const watchStatus = watch('status')

  const addPostHandler = async (values) => {
    values.slug = slugify(values.slug || values.title)
    handleResetUpload()
    console.log('addPostHandler ~ values:', values)
  }

  return (
    <>
      <DashboardHeading title='Add post' desc='Add new post'></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className='form-layout'>
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder='Enter your title'
              name='title'
              required></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder='Enter your slug'
              name='slug'></Input>
          </Field>
        </div>
        <div className='form-layout'>
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className='h-[250px]'
              progress={progress}
              image={image}
            />
          </Field>
        </div>
        <div className='form-layout'>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name='status'
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}>
                Approved
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}>
                Pending
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}>
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type='submit' className='mx-auto w-[250px]'>
          Add new post
        </Button>
      </form>
    </>
  )
}

export default PostAddNew

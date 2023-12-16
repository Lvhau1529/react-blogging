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
import {Toggle} from '../../components/toggle'
import {useEffect, useState} from 'react'
import {Dropdown} from '../../components/dropdown'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore'
import {db} from '../../firebase-app/firebase-config'
import {toast} from 'react-toastify'

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
  const watchHot = watch('hot')
  const [categories, setCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState('')

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    document.title = 'Monkey Blogging - Add new post'
  }, [])

  async function getData() {
    const colRef = collection(db, 'categories')
    const q = query(colRef, where('status', '==', 1))
    const querySnapshot = await getDocs(q)
    let result = []
    querySnapshot?.forEach((doc) => {
      result.push({
        id: doc?.id,
        ...doc?.data()
      })
    })
    setCategories(result)
  }

  const addPostHandler = async (values) => {
    const cloneValues = {...values}
    cloneValues.slug = slugify(values.slug || values.title, {lower: true})
    cloneValues.status = Number(values.status)
    const colRef = await collection(db, 'posts')
    await addDoc(colRef, {
      ...cloneValues,
      image,
      createdAt: serverTimestamp()
    })
    toast.success('Create new post successfully!')
    reset({
      title: '',
      slug: '',
      status: 2,
      category: {},
      hot: false,
      image: '',
      user: {}
    })
    handleResetUpload()
    setSelectCategory({})
    console.log('addPostHandler ~ values:', values)
  }

  const handleClickOption = async (item) => {
    const colRef = doc(db, 'categories', item.id)
    const docData = await getDoc(colRef)
    setValue('category', {
      id: docData.id,
      ...docData.data()
    })
    setSelectCategory(item)
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
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder='Select the category'></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}>
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className='inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50'>
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className='form-layout'>
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue('hot', !watchHot)}></Toggle>
          </Field>
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

const Label = ({ htmlFor = '', children, ...props }) => {
  return (
    <>
      <label htmlFor={htmlFor} {...props} className='text-grayDark cursor-pointer font-medium'>
        {children}
      </label>
    </>
  )
}

export default Label

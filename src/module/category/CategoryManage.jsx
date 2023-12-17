import { useEffect, useState } from "react"
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { categoryStatus } from "@/utils/constants"
import { LabelStatus } from "@/components/label"
import { Button } from "@/components/button"
import DashboardHeading from "@/module/dashboard/DashboardHeading"
import { ActionDelete, ActionEdit, ActionView } from "@/components/action"
import Table from "@/components/table/Table"
import { db } from "@/firebase-app/firebase-config"

const CategoryManage = () => {
  const navigate = useNavigate()
  const [categoryList, setCategoryList] = useState([])
  const [total, setTotal] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories")

      onSnapshot(colRef, (snapshot) => {
        let results = []
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setCategoryList(results)
      })
    }
    fetchData()
  }, [])

  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, "categories", docId)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef)
        Swal.fire("Deleted!", "Your file has been deleted.", "success")
      }
    })
  }

  const handleInputFilter = () => {}

  const handleLoadMoreCategory = () => {}

  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView
                      onClick={() =>
                        navigate(`/category/${category.slug}`)
                      }></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }></ActionEdit>
                    <ActionDelete
                      onClick={() =>
                        handleDeleteCategory(category.id)
                      }></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categoryList.length && (
        <div className="mt-10">
          <Button onClick={handleLoadMoreCategory} className="mx-auto">
            Load more
          </Button>
          {total}
        </div>
      )}
    </div>
  )
}

export default CategoryManage

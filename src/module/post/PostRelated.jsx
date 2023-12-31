import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import PostItem from "./PostItem"
import { db } from "@/firebase-app/firebase-config"
import Heading from "@/components/layouts/Heading"

const PostRelated = ({ categoryId = "", postInfoId = "" }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId)
    )
    onSnapshot(docRef, (snapshot) => {
      const results = []
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setPosts(results.filter(item => item.id !== postInfoId))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postInfoId])

  if (!categoryId || posts.length <= 0) return null
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map((item) => (
          <PostItem key={item.id} data={item}></PostItem>
        ))}
      </div>
    </div>
  )
}

export default PostRelated

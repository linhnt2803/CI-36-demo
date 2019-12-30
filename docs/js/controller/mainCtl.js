// save all business logic
const controller = {}

// async function demoQueryDatabase() {
//   // common format: firebase.firestore().collection('name').{...}.command()
//   // 1. READ    .get()
//   // getMany
//   let result = await firebase
//     .firestore()
//     .collection('conversations')
//     // .where('users', 'array-contains', "quangldxyz@gmail.com")
//     .where('title', '==', 'First conversation')
//     .get()
//   console.log("result get many", transformDocs(result.docs))

//   // getOne
//   let id = 'r90kPPbyEGnTIf54Odpe'
//   let result2 = await firebase
//     .firestore()
//     .collection('conversations')
//     .doc(id)
//     .get()
//   console.log("result get one", transformDoc(result2))

//   // 2. CREATE  .add()
//   // let data = {
//   //   users: ["email1", "email2"],
//   //   messages: [],
//   //   title: "Demo conversation",
//   //   createdAt: new Date().toISOString()
//   // }
//   // let result3 = await firebase
//   //   .firestore()
//   //   .collection('conversations')
//   //   .add(data)
//   // console.log("result add", result3.id)

//   // 3. UPDATE  .update()
//   let id2 = '0oCX25AeNXsdHCBi0TVP'
//   await firebase
//     .firestore()
//     .collection('conversations')
//     .doc(id2)
//     .update({
//       // title: 'Updated title',
//       // test: 123456789,
//       users: firebase.firestore.FieldValue.arrayUnion('user3')
//     })
//   console.log("result update")

//   // 4. DELETE  .delete()
//   let id3 = '63RFKeiGxzKs9FXazk6c'
//   await firebase
//     .firestore()
//     .collection('conversations')
//     .doc(id3)
//     .delete()
//   console.log("result delete")
// }

function transformDocs(docs) {
  let datas = []
  for(let doc of docs) {
    let data = doc.data()
    data.id = doc.id
    datas.push(data)
  }
  return datas
}

function transformDoc(doc) {
  let data = doc.data()
  data.id = doc.id
  return data
}
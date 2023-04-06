export default function handler(req, res) {
    if(false){
      return res.status(401).json('Resource access not authorized')
    }
    res.status(200).json({
      username: 'adam&gaetan',
      email: 'email@gmail.com',
      creation_date: '2022-04-06',
    })
  }
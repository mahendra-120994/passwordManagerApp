import './index.css'

const SavedPassword = props => {
  const {userDetails, deleteUser, isPasswordShown} = props

  const {id, username, password, website} = userDetails
  const firstLatter = username[0]

  const onDelete = () => {
    deleteUser(id)
  }
  return (
    <li className="list">
      <div className="list_items">
        <div className="firstLatter">{firstLatter}</div>
        <div className="details_container">
          <p className="details">{website}</p>
          <p className="details">{username}</p>
          {isPasswordShown && <p className="details">{password}</p>}
          {!isPasswordShown && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete_btn"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="dlt_logo"
        />
      </button>
    </li>
  )
}
export default SavedPassword

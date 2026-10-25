import PropTypes from 'prop-types'

function BookCard({ buku, onEdit, onDelete }) {
  return (
    <article className="book-card">
      <h3>{buku.judul}</h3>
      <p>Penulis: {buku.penulis}</p>
      <p>Tahun terbit: {buku.tahun}</p>

      <button type="button" onClick={() => onEdit(buku)}>
        Edit
      </button>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(buku.id)}
      >
        Hapus
      </button>
    </article>
  )
}

BookCard.propTypes = {
  buku: PropTypes.shape({
    id: PropTypes.number.isRequired,
    judul: PropTypes.string.isRequired,
    penulis: PropTypes.string.isRequired,
    tahun: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BookCard
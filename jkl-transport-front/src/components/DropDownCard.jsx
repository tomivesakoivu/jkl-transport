const DropDownCard = ({ data = [] }) => (
  <div>
    <ul className="text-left">
      {data.map((item, i) => (
        <li key={i}>
          {item}
        </li>
      ))}
    </ul>
  </div>
)

export default DropDownCard

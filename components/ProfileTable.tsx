const ProfileTable = ({ name, pedigree_name = "-", en_name, sex, number, foaled, country, imported, owner }) => {
  return (
    <div className="w-2/5 overflow-x-auto">
      <table className="table-fixed">
        <tbody>
          <tr>
            <th>馬名</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th>血統名</th>
            <td>{pedigree_name}</td>
          </tr>
          <tr>
            <th>欧字表記</th>
            <td>{en_name}</td>
          </tr>
          <tr>
            <th>性別</th>
            <td>{sex}</td>
          </tr>
          <tr>
            <th>ファミリーナンバー</th>
            <td>{number}</td>
          </tr>
          <tr>
            <th>生誕</th>
            <td>{foaled}</td>
          </tr>
          <tr>
            <th>生産国</th>
            <td>{country}</td>
          </tr>
          <tr>
            <th>輸入</th>
            <td>{imported}</td>
          </tr>
          <tr>
            <th>主な所有者</th>
            <td>{owner}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProfileTable

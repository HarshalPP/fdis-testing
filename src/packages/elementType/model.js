import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import{AreaDescriptionSeq} from '../../models'

const ElementTypeSeqFactory = () => {
  return dbConfig.define(
    'ElementType',
    {
      ElementTypeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      ElementTypeValue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      tableName: 'ElementType',
      // defaultScope: {
      //   order: [['ElementType', 'ASC']]
      // }

    },
  )
}

const ElementTypeAreaseq=dbConfig.define(
  
  'Elementype_Area',
  {
    timestamps:false,
    tableName:'Elementype_Area',
  }

);


const ElementTypeSeq = ElementTypeSeqFactory()


setTimeout(()=>{

  ElementTypeSeq.belongsToMany(AreaDescriptionSeq,{
    through:ElementTypeAreaseq,
    as:'ElementType',
    foreignKey:'ElementTypeId',
    timestamps:false,

  })

  AreaDescriptionSeq.belongsToMany(ElementTypeSeq,{
    through:ElementTypeAreaseq,
    as:'Area',
    foreignKey:'AreaId',
    timestamps:false,
  })

},0)

export default ElementTypeSeq

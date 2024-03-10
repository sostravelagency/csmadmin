'use strict';

module.exports = function (sequelize, DataTypes) {
  var Cart = sequelize.define('Cart', {
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    discount: DataTypes.INTEGER
  }, {});
  Cart.associate = function (models) {
    // associations can be defined here
    models.Cart.belongsTo(models.Address, {
      foreignKey: 'addressId'
    });
    models.Cart.belongsTo(models.Order, {
      foreignKey: 'orderId'
    });
  };
  return Cart;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwiQ2FydCIsImRlZmluZSIsInByb2R1Y3RJZCIsIklOVEVHRVIiLCJuYW1lIiwiU1RSSU5HIiwib3JkZXJJZCIsImFkZHJlc3NJZCIsInByaWNlIiwidG90YWwiLCJxdHkiLCJwaG90byIsImRpc2NvdW50IiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiYmVsb25nc1RvIiwiQWRkcmVzcyIsImZvcmVpZ25LZXkiLCJPcmRlciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY2FydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSA9PiB7XHJcbiAgY29uc3QgQ2FydCA9IHNlcXVlbGl6ZS5kZWZpbmUoJ0NhcnQnLCB7XHJcbiAgICBwcm9kdWN0SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgIG9yZGVySWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgYWRkcmVzc0lkOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIHByaWNlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIHRvdGFsOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIHF0eTogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICBwaG90bzogRGF0YVR5cGVzLlNUUklORyxcclxuICAgIGRpc2NvdW50OiBEYXRhVHlwZXMuSU5URUdFUlxyXG4gIH0sIHt9KTtcclxuICBDYXJ0LmFzc29jaWF0ZSA9IGZ1bmN0aW9uKG1vZGVscykge1xyXG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcclxuICAgIG1vZGVscy5DYXJ0LmJlbG9uZ3NUbyhtb2RlbHMuQWRkcmVzcywgeyBmb3JlaWduS2V5OiAnYWRkcmVzc0lkJyB9KTsgIFxyXG4gICAgbW9kZWxzLkNhcnQuYmVsb25nc1RvKG1vZGVscy5PcmRlciwgeyBmb3JlaWduS2V5OiAnb3JkZXJJZCcgfSk7XHJcbiAgfTtcclxuICByZXR1cm4gQ2FydDtcclxufTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBQ1pBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHLFVBQUNDLFNBQVMsRUFBRUMsU0FBUyxFQUFLO0VBQ3pDLElBQU1DLElBQUksR0FBR0YsU0FBUyxDQUFDRyxNQUFNLENBQUMsTUFBTSxFQUFFO0lBQ3BDQyxTQUFTLEVBQUVILFNBQVMsQ0FBQ0ksT0FBTztJQUM1QkMsSUFBSSxFQUFFTCxTQUFTLENBQUNNLE1BQU07SUFDdEJDLE9BQU8sRUFBRVAsU0FBUyxDQUFDSSxPQUFPO0lBQzFCSSxTQUFTLEVBQUVSLFNBQVMsQ0FBQ0ksT0FBTztJQUM1QkssS0FBSyxFQUFFVCxTQUFTLENBQUNJLE9BQU87SUFDeEJNLEtBQUssRUFBRVYsU0FBUyxDQUFDSSxPQUFPO0lBQ3hCTyxHQUFHLEVBQUVYLFNBQVMsQ0FBQ0ksT0FBTztJQUN0QlEsS0FBSyxFQUFFWixTQUFTLENBQUNNLE1BQU07SUFDdkJPLFFBQVEsRUFBRWIsU0FBUyxDQUFDSTtFQUN0QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDTkgsSUFBSSxDQUFDYSxTQUFTLEdBQUcsVUFBU0MsTUFBTSxFQUFFO0lBQ2hDO0lBQ0FBLE1BQU0sQ0FBQ2QsSUFBSSxDQUFDZSxTQUFTLENBQUNELE1BQU0sQ0FBQ0UsT0FBTyxFQUFFO01BQUVDLFVBQVUsRUFBRTtJQUFZLENBQUMsQ0FBQztJQUNsRUgsTUFBTSxDQUFDZCxJQUFJLENBQUNlLFNBQVMsQ0FBQ0QsTUFBTSxDQUFDSSxLQUFLLEVBQUU7TUFBRUQsVUFBVSxFQUFFO0lBQVUsQ0FBQyxDQUFDO0VBQ2hFLENBQUM7RUFDRCxPQUFPakIsSUFBSTtBQUNiLENBQUMifQ==
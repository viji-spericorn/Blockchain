const Signup = require('../user');
const Login = require('../login');

(async () => {
  try {
    const adminData = {
      name: 'Admin123',
      email: 'Admin123@gmail.com',
      phoneNumber: '+91 9961035648',
      aadharNumber: '7871 4588 9737',
      pinCode: '695543',
      address: 'vc Bhavan Kadukkamala',
      country: 'India',
      state: 'kerala',
      dob: '2000-10-28',
    };

    const logindata = {
      password: 'Admin123',
    };
    const salt = await Login.generateSalt();
    logindata.password = await Login.hashPassword(logindata.password, salt);

    let existingData = await Login.findOne({
      where: { email: adminData.email },
    });

    if (!existingData) {
      const loginDetails = await Login.create({
        ...adminData,
        password: logindata.password,
        salt,
        role: 'admin',
      });
      console.log('Admin created successfully');
      await Signup.create({
        ...adminData,
        loginId: loginDetails.id,
      });
    } else {
      console.log(`Data already exists`);
    }
    process.exit(0);
  } catch (error) {
    console.log('error', error.message);
  }
})();

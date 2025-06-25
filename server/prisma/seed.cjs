// prisma/seed.cjs
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Clear existing data (optional)
  await prisma.$transaction([
    prisma.notifications.deleteMany(),     // ✅ Matches `notifications` model
    prisma.duty_fees.deleteMany(),         // ✅ Matches `duty_fees` model
    prisma.package_pallet.deleteMany(),    // ✅ Matches `package_pallet` model
    prisma.packages.deleteMany(),          // ✅ Matches `packages` model
    prisma.pallets.deleteMany(),           // ✅ Matches `pallets` model
    prisma.warehouse_scans.deleteMany(),   // ✅ Matches `warehouse_scans` model
    prisma.user_addresses.deleteMany(),    // ✅ Matches `user_addresses` model
    prisma.users.deleteMany(),             // ✅ Matches `users` model
    prisma.staff.deleteMany(), 
  ])

  // Create staff
  const staff = await prisma.staff.create({
    data: {
      username: 'admin',
      password: 'securepassword',
      role: 'admin',
      full_name: 'Admin User'
    }
  })
  // Create user with address
const user1 = await prisma.users.create({
  data: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    password: 'hashed_password_here', // Always hash passwords!
    phone: '18765551234',
    trn: '123456789',
    account_balance: 0.00,
    user_addresses: {
      create: {
        unique_identifier: 'JOHN1234',
        contact_name: 'John Doe',
        address_line1: '123 Main St',
        city: 'Kingston',
        state: 'JM',
        zip_code: 'KN12345',
        is_active: true
      }
    }
  }
});
console.log(`Created user with ID: ${user1.user_id}`);

const scan = await prisma.warehouse_scans.create({
  data: {
    tracking_number: 'USPS123456789',
    carrier: 'USPS',
    operator_id: staff.staff_id,
    weight_lbs: 4.2,
    dimensions: '12x8x5'
  }
});

const pkg = await prisma.packages.create({
  data: {
    user_id: user1.user_id,
    tracking_number: 'USPS123456789',
    carrier: 'USPS',
    weight_lbs: 4.2,
    declared_value: 50.00,
    status: 'received_fl'
  }
});
const pallet = await prisma.pallets.create({
  data: {
    shipping_method: 'air',
    departure_date: new Date(),
    created_by: staff.staff_id,
    package_pallet: {
      create: {
        package_id: pkg.package_id,
        position: 'A1'
      }
    }
  }
});

  // Create sample user WITH ADDRESS (corrected relation)
  /*
  const user1 = await prisma.user.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'userpassword',
      phone: '18765551234',
      trn: '123456789',
      account_balance: 0.00,
      user_addresses: { // Correct field name (matches schema)
        create: {
          unique_identifier: 'JOHN1234',
          contact_name: 'John Doe',
          address_line1: '123 Main St',
          city: 'Kingston',
          state: 'JM',
          zip_code: 'KN12345',
          is_active: true
        }
      }
    }
  })

  // Create warehouse scan
  const scan = await prisma.warehouseScan.create({
    data: {
      tracking_number: 'USPS123456789',
      carrier: 'USPS',
      operator_id: staff.staff_id,
      weight_lbs: 4.2,
      dimensions: '12x8x5'
    }
  })

  // Create package (fixed relation fields)
  const pkg = await prisma.package.create({
    data: {
      user_id: user1.user_id,
      tracking_number: 'USPS123456789',
      carrier: 'USPS',
      weight_lbs: 4.2,
      declared_value: 50.00,
      status: 'received_fl',
      duty_fees: {
        create: {
          customs_duty: 10.00,
          gct: 7.50,
          handling_fee: 5.00,
          total: 22.50,
          payment_status: 'unpaid'
        }
      }
    }
  })

  // Create pallet (correct relation)
  const pallet = await prisma.pallet.create({
    data: {
      shipping_method: 'air',
      departure_date: new Date(),
      created_by: staff.staff_id, // Field name matches schema
      package_pallet: { // Correct relation name
        create: {
          package_id: pkg.package_id,
          position: 'A1'
        }
      }
    }
  })*/

  console.log('🌱 Database seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
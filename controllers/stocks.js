import User from "../models/users.js";
import UserStock from "../models/userstocks.js";
import Trade from "../models/trades.js";

export async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const symbol = req.params.id;
    // console.log(userId);
    const user = await User.findById(userId).populate("stocks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user's stock:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

// Allow a user to add a stock to their portfolio
export async function createStock(req, res) {
  try {
    const { symbol, quantity, stake, id } = req.body;
    const balance = req.body.userBalance;

    const user = await User.findOne({ _id: id });

    // console.log("STOCKS", user.stocks);
    // console.log("LENGTH", user.stocks.length);
console.log(user)
    if (user.stocks) {
      const stock = new UserStock({ symbol, quantity, stake, user: id });
      const receipt = new Trade({ symbol, quantity, stake, type: 1 });
      user.stocks.push(stock);
      user.trades.push(receipt);
      user.balance = balance;
      await receipt.save();
      await stock.save();
      await user.save();
    //   console.log(user);
      return res.json(user);
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
}

// Allow a user to sell a specific quantity of a stock
export async function editStock(req, res) {
  try {
    let { symbol, quantity, stake, id, balance, type } = req.body;
    // console.log(req.body);

    let user = await User.findById(id).populate("stocks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let targetStock = null;
    for (let stock of user.stocks) {
      if (stock.symbol === symbol) {
        targetStock = stock;
        break;
      }
    }

    if (!targetStock) {
      return res.status(404).json({
        status: 404,
        message: "Stock not found for the user.",
      });
    }
    // console.log(balance);
    if (!type) {
      const receipt = new Trade({ symbol, quantity, stake, type: 0 });
      user.trades.push(receipt);
      await receipt.save();
      targetStock.quantity -= quantity;
      targetStock.stake -= stake;
      balance += stake;
    //   console.log(balance);
    } else {
      const receipt = new Trade({ symbol, quantity, stake, type: 1 });
      user.trades.push(receipt);
      await receipt.save();
      targetStock.quantity += quantity;
      targetStock.stake += stake;
      balance -= stake;
    //   console.log(balance);
    }
    user.balance = balance;

    await user.save();
    await targetStock.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
}

// Allow a user to sell all shares of a specific stock
export async function deleteStock(req, res) {
  try {
    let { symbol, quantity, stake, id, balance } = req.body;

    let user = await User.findById(id).populate("stocks");

    if (!user) {
    //   console.log("NO USERS");
      return res.status(404).json({ message: "User not found" });
    }

    // Find the stock with the matching symbol
    const targetStock = user.stocks.find((stock) => stock.symbol === symbol);

    if (!targetStock) {
      return res.status(404).json({ message: "Stock not found for the user." });
    }

    // Remove the stock from the UserStock schema
    await UserStock.deleteOne({ _id: targetStock._id });

    // Update the user's stocks array by filtering out the target stock
    user.stocks = user.stocks.filter((stock) => stock.symbol !== symbol);

    balance += stake;
    const receipt = new Trade({ symbol, quantity, stake, type: 0 });
    user.trades.push(receipt);
    await receipt.save();
    await user.save();
    return res.status(200).json({ message: "Stock DELETED successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

import PostModel from "../models/post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json({ tags });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить тэги",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json({ posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};
export const getOne = (req, res) => {
  const postId = req.params.id;

  PostModel.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $inc: { viewsCount: 1 },
    },
    {
      returnDocument: "after",
    },
  )
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        });
      }

      res.json({ doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Не удалось вернуть статью",
      });
    });
};
export const remove = (req, res) => {
  const postId = req.params.id;

  PostModel.findOneAndDelete({
    _id: postId,
  })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        });
      }

      res.json({
        message: "Статья была удалена",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Не удалось удалить статью",
      });
    });
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    if (!doc) {
      return res.status(400).json({
        message: "Не удалось создать статью",
      });
    }

    const post = await doc.save();

    if (!post) {
      return res.status(400).json({
        message: "Не удалось создать статью",
      });
    }

    return res.json({ post });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const doc = new PostModel({
      commentsText: req.body.text,
      user: req.userId,
    });

    if (!doc) {
      return res.status(400).json({
        message: "Не удалось написать комментарий",
      });
    }

    const comment = await doc.save();

    if (!comment) {
      return res.status(400).json({
        message: "Не удалось написать комментарий",
      });
    }

    return res.json({ comment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не удалось написать комментарий",
    });
  }
};
export const removeComment = (req, res) => {
  const commentId = req.params.id;

  PostModel.findOneAndDelete({
    _id: commentId,
  })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Комментарий не найден",
        });
      }

      res.json({
        message: "Комментарий был удален",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Не удалось удалить комментарий",
      });
    });
};
export const getAllByPostId= async (req, res) => {
  try {
    const comments = await PostModel.find({ postId: req.params.id }).populate("Comment").exec();

    res.json({ comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};

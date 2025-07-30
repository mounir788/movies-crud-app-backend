import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const mediaSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['Movie', 'TV Show']),
  director: z.string().min(1, 'Director is required'),
  budget: z.string().min(1, 'Budget is required'),
  location: z.string().min(1, 'Location is required'),
  duration: z.string().min(1, 'Duration is required'),
  year: z.string().min(1, 'Year is required'),
});

export const createMedia = async (req: Request, res: Response) => {
  try {
    const validatedData = mediaSchema.parse(req.body);
    const media = await prisma.media.create({
      data: validatedData,
    });
    res.status(201).json({
      success: true,
      data: media,
      message: 'Media created successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.issues
      });
    }
    console.error('Create media error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create media'
    });
  }
};

export const getMedia = async (req: Request, res: Response) => {
  const { page = '1', limit = '10', search } = req.query;
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  try {
    const whereClause = search ? {
      OR: [
        { title: { contains: search as string, mode: 'insensitive' } },
        { director: { contains: search as string, mode: 'insensitive' } },
        { location: { contains: search as string, mode: 'insensitive' } },
      ]
    } : {};

    const media = await prisma.media.findMany({
      where: whereClause,
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.media.count({ where: whereClause });

    res.json({
      success: true,
      data: media,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      }
    });
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch media'
    });
  }
};

export const getMediaById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return res.status(404).json({
        success: false,
        error: 'Media not found'
      });
    }

    res.json({
      success: true,
      data: media
    });
  } catch (error) {
    console.error('Get media by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch media'
    });
  }
};

export const updateMedia = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const validatedData = mediaSchema.parse(req.body);

    const existingMedia = await prisma.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return res.status(404).json({
        success: false,
        error: 'Media not found'
      });
    }

    const media = await prisma.media.update({
      where: { id },
      data: validatedData,
    });

    res.json({
      success: true,
      data: media,
      message: 'Media updated successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.issues
      });
    }
    console.error('Update media error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update media'
    });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingMedia = await prisma.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return res.status(404).json({
        success: false,
        error: 'Media not found'
      });
    }

    await prisma.media.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete media'
    });
  }
};